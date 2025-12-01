
class ProductRepository {
    #getKey(sku) {
        return `Product_${sku}`;
    }

    #fromData(data) {
        const json = JSON.parse(data);
        const product = Product.of(json);
        return product;
    }

    #toData(product) {
        const json = {
            id: product.id,
            sku: product.sku,
            name: product.name, 
            category: product.category,
            manufacturer: product.manufacturer,
            description: product.description,
            price: product.price,
            location: product.location, 
            supplier: product.supplier,
            weight: product.weight, 
            volume: product.volume,
        };
        return JSON.stringify(json);
    }

    *all(search) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("Product_")) {
                const data = localStorage.getItem(key);                
                const product = this.#fromData(data);
                if (product.matches(search)) {
                    yield product;
                }
            }
        }
    }

    find(sku) {
        if (sku === null || typeof sku !== "string") {
            throw new Error("Invalid sku type.");
        }
        const key = this.#getKey(sku);
        const data = localStorage.getItem(key);
        
        let product = null;
        if (data !== null) {
            product = this.#fromData(data);
        }
        
        return product;
    }

    get(sku) {
        const product = this.find(sku);
        if (product === null) {
            throw new Error(`Product with sku ${sku} not found.`);
        }
        return product;
    }

    contains(sku) {
        const product = this.find(sku);
        return product !== null;
    }

    save(product) {
        if (product === null || typeof product !== 'Product') {
            throw new Error("Invalid product type.");
        }
        const key = this.#getKey(product.sku);
        const data = this.#toData(product);
        localStorage.setItem(key, data);
    }

    delete(sku) {
        const key = this.#getKey(sku);
        localStorage.removeItem(key);
    }
}

class StockRepository {
    #getKey(sku) {
        return `Stock_${sku}`;
    }

    #fromData(data) {
        const json = JSON.parse(data);
        const stock = Stock.of(json);
        return stock;
    }

    #toData(stock) {
        const json = {
            sku: stock.sku,
            quantity: stock.quantity
        };
        return JSON.stringify(json);
    }

    find(sku) {
        if (sku === null || typeof sku !== 'string') {
            throw new Error("Invalid sku type.");
        }
        const key = this.#getKey(sku);
        const data = localStorage.getItem(key);
        
        let stock = null;
        if (data !== null) {
            stock = this.#fromData(data);
        }
        
        return stock;
    }

    get(sku) {
        const stock = this.find(sku);
        if (stock === null) {
            throw new Error(`Stock with sku ${sku} not found.`);
        }
        return stock;
    }

    contains(sku) {
        const stock = this.find(sku);
        return stock !== null;
    }

    save(stock) {
        if (stock === null || typeof stock !== 'Stock') {
            throw new Error("Invalid stock type.");
        }
        const key = this.#getKey(stock.sku);
        const data = this.#toData(stock);
        localStorage.setItem(key, data);
    }

    delete(sku) {
        const key = this.#getKey(sku);
        localStorage.removeItem(key);
    }
}

class TransactionRepository {
    #getKey(id) {
        return `Transaction_${id}`;
    }

    #fromData(data) {
        const json = JSON.parse(data);
        const transaction = Transaction.of(json);        
        return transaction;
    }

    #toData(transaction) {
        const json = {
            sku: transaction.sku,
            quantity: transaction.quantity
        };
        return JSON.stringify(json);
    }

    find(id) {
        if (id === null || typeof id !== 'string') {
            throw new Error("Invalid transaction ID type.");
        }
        const key = this.#getKey(id);
        const data = localStorage.getItem(key);
        
        let transaction = null;
        if (data !== null) {
            transaction = this.#fromData(data);
        }
        
        return transaction;
    }

    get(id) {
        const transaction = this.find(id);
        if (transaction === null) {
            throw new Error(`Transaction with ID ${id} not found.`);
        }
        return transaction;
    }

    save(transaction) {
        if (transaction === null || typeof transaction !== 'Transaction') {
            throw new Error("Invalid transaction type.");
        }
        const key = this.#getKey(transaction.id);
        const data = this.#toData(transaction);
        localStorage.setItem(key, data);
    }

    delete(id) {
        const key = this.#getKey(id);
        localStorage.removeItem(key);
    }
}