
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

class Inventory {
    sku = "";
    name = "";
    category  = "";
    quantity = 0;
    price = "";
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
            const stock = this.#_stockRepository.get(product.sku);

            const vm = new Inventory();
            vm.sku = product.sku;
            vm.name = product.name;
            vm.category = product.category;
            vm.quantity = stock.quantity;
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

            result.push(vm);
        }

        return result;
    }

    registerProduct(sku, name) {
        if (sku === null || !(sku instanceof String)) {
            throw new Error("Invalid product SKU.");
        }
        if (name === null || !(name instanceof String) || name.length <= 0) {
            throw new Error("Invalid product name.")
        }
        if (this.#_productRepository.contains(sku)) {
            throw new Error("Product already registered.");
        }

        const product = new Product(sku);
        product.name = name;
        this.#_productRepository.save(product);

        const stock = new Stock(sku);
        this.#_stockRepository.save(stock);
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

