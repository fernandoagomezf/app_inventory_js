
class ViewState {
    #_state = null;

    get state() {
        if (this.#_state === null) {
            this.load();
        }
        return this.#_state;
    }

    load() {
        const data = localStorage.getItem("App_ViewState");
        if (data === null) {
            this.#_state = {
                selectedSku: null,
                caller: null,
            };
        } else {
            this.#_state = JSON.parse(data);
        }
    }

    save() {
        const data = JSON.stringify(this.#_state);
        localStorage.setItem("App_ViewState", data);
    }

    reset() {
        localStorage.removeItem("App_ViewState");
        this.#_state = null;
    }
}

class ErrorView {
    #_errors = null;
    #_panel = null;
    #_content = null;

    constructor() {
        this.#_errors = new Array();
        const panel = document.getElementById("error-panel");
        if (panel === null) {
            console.log("No error panel was found.");
        }
        this.#_panel = panel;
        const content = document.getElementById("error-content");
        if (content === null) {
            console.log("No error content was found.");
        }
        this.#_content = content;
    }

    has() {
        return this.#_errors.length > 0;
    }

    report(error) {
        if (error !== null && error.length > 0) {
            this.#_errors.push(error);
        }
    }

    clear() {
        this.#_errors.clear();
    }

    update() {
        const count = this.#_errors.length;
        if (count > 0) {            
            if (count === 1) {
                this.#_content.innerHTML = `<p>An error has occured: ${this.#_errors[0]}</p>`;
            } else {
                let html = `<p>${count} errors occurred:</p>`;
                html += "<ul>";
                for (let i  = 0; i < count; i++) {
                    html += `<li>${this.#_errors[i]}</li>`;
                }
                html += "</ul>"
                this.#_content.innerHTML = html;
            }
            this.#_panel.style.display = "block";
        } else {
            this.#_panel.style.display = "none";
        }
    }
}

class Inventory {
    sku = "";
    name = "";
    category  = "";
    quantity = 0;
    price = "";
    location = "";
    status = {
        text: "",
        badge: ""
    };
}

class InventoryManager {
    #_productRepository = null;
    #_stockRepository = null;
    #_transactionRepository = null;

    constructor() {
        this.#_productRepository = new ProductRepository();
        this.#_stockRepository = new StockRepository();
        this.#_transactionRepository = new TransactionRepository();
    }

    getProducts(search){
        let result = [];
        for (const product of this.#_productRepository.all(search)) {
            const vm = this.getInventory(product.sku);            
            result.push(vm);
        }

        return result;
    }

    getInventory(sku) {
        if (sku === null || sku.length <= 0) {
            throw new Error("Invalid SKU");
        }

        const product = this.#_productRepository.get(sku);
        const stock = this.#_stockRepository.get(sku);

        const vm = new Inventory();
        vm.sku = product.sku;
        vm.name = product.name;
        vm.category = product.category;
        vm.quantity = stock.quantity;
        vm.location = product.location;
        vm.price = product.price.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN"
        });
        vm.status.text = stock.outOfStock() ? "Out of Stock" :
                            stock.lowStock() ? "Low Stock" :
                            stock.inStock() ? "In Stock" : 
                            "";
        vm.status.badge = stock.outOfStock() ? "bg-danger" :
                            stock.lowStock() ? "bg-warning text-dark" :
                            stock.inStock() ? "bg-success" : 
                            "";

        return vm;
    }

    registerProduct(sku, name) {
        if (sku === null || sku.length <= 0) {
            throw new Error("Invalid product SKU.");
        }
        if (name === null || name.length <= 0) {
            throw new Error("Invalid product name.")
        }

        let product = null;
        if (this.#_productRepository.contains(sku)) {
            //product = this.#_productRepository.get(sku);
            throw new Error(`The SKU ${sku} has already been registered.`);
        } 

        product = new Product(sku);
        product.name = name;
        this.#_productRepository.save(product);
        
        let stock = new Stock(sku);
        this.#_stockRepository.save(stock);

        return product;
    }

    loadProduct(sku) {
        if (sku === null || sku.length <= 0) {
            throw new Error("Invalid product SKU.");
        }
        
        if (!this.#_productRepository.contains(sku)) {
            throw new Error(`The SKU ${sku} has not been registered yet.`);
        } 
        return this.#_productRepository.get(sku);
    }

    updateProduct(product) {
        if (product === null) {
            throw new Error("Invalid product to save.");
        }

        this.#_productRepository.save(product);
    }

    deleteProduct(sku) {
        if (sku === null || sku.length <= 0) {
            throw new Error("Invalid product SKU.");
        }
        this.#_productRepository.delete(sku);
        this.#_stockRepository.delete(sku);
        this.#_transactionRepository.delete(sku);
    }

    #moveStock(sku, quantity, movement) {
        const product = this.#_productRepository.get(sku);
        const stock = this.#_stockRepository.get(sku);
        
        if (movement > 0) {
            stock.quantity += quantity;
        } else {
            stock.quantity -= quantity;
        }
        const transaction = new Transaction(
            sku, 
            stock.quantity, 
            product.price, 
            movement
        );
        
        this.#_stockRepository.save(stock);
        this.#_transactionRepository.save(transaction);
    }

    increaseStock(sku, quantity) {
        this.#moveStock(sku, quantity, Transaction.POS);
    }

    decreaseStock(sku, quantity) {
        this.#moveStock(sku, quantity, Transaction.NEG);     
    }
}

