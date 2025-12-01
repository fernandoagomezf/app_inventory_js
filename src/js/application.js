
class Inventory {
    sku = "";
    name = "";
    category  = "";
    quantity = 0;
    price = 0.0;
    status = "";    
}

class InventoryManager {
    #_productRepository = null;
    #_stockRepository = null;
    #_transactionRepository = null;

    constructor() {
        this.#_productRepository = new ProductRepository();
        this.#_stockRepository = new ProductRepository();
        this.#_transactionRepository = new TransactionRepository();
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


