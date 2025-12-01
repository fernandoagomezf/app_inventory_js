
class ProductRepository {
    #getKey(sku) {
        return `Product_{sku}`;
    }

    *all(search) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("Product_")) {
                const product = this.get(key);
                if (product.matches(search)) {
                    yield product;
                }
            }
        }
    }

    find(sku) {
        if (sku === null || !(sku instanceof String)) {
            throw new Error("Invalid sku type.");
        }
        const key = this.#getKey(sku);
        const data = localStorage.getItem(key);
        
        let product = null;
        if (data !== null) {
            product = JSON.parse(data);
        }
        
        return product;
    }

    get(sku) {
        const product = this.find(sku);
        if (product === null) {
            throw new Error(`Product with sku {sku} not found.`);
        }
        return product;
    }

    contains(sku) {
        const product = this.find(sku);
        return product !== null;
    }

    save(product) {
        if (product === null || !(product instanceof Product)) {
            throw new Error("Invalid product type.");
        }
        const key = this.#getKey(product.sku);
        const data = JSON.stringify(product);
        localStorage.setItem(key, data);
    }

    delete(sku) {
        const key = this.#getKey(sku);
        localStorage.removeItem(key);
    }
}

class StockRepository {
    #getKey(sku) {
        return `Stock_{sku}`;
    }

    find(sku) {
        if (sku === null || !(sku instanceof String)) {
            throw new Error("Invalid sku type.");
        }
        const key = this.#getKey(sku);
        const data = localStorage.getItem(key);
        
        let stock = null;
        if (data !== null) {
            stock = JSON.parse(data);
        }
        
        return stock;
    }

    get(sku) {
        const stock = this.find(sku);
        if (stock === null) {
            throw new Error(`Stock with sku {sku} not found.`);
        }
        return stock;
    }

    contains(sku) {
        const stock = this.find(sku);
        return stock !== null;
    }

    save(stock) {
        if (stock === null || !(stock instanceof Stock)) {
            throw new Error("Invalid stock type.");
        }
        const key = this.#getKey(stock.sku);
        const data = JSON.stringify(stock);
        localStorage.setItem(key, data);
    }

    delete(sku) {
        const key = this.#getKey(sku);
        localStorage.removeItem(key);
    }
}

class TransactionRepository {
    #getKey(id) {
        return `Transaction_{id}`;
    }

    find(id) {
        if (id === null || !(sku instanceof String)) {
            throw new Error("Invalid transaction ID type.");
        }
        const key = this.#getKey(id);
        const data = localStorage.getItem(key);
        
        let transaction = null;
        if (data !== null) {
            transaction = JSON.parse(data);
        }
        
        return transaction;
    }

    get(id) {
        const product = this.find(id);
        if (product === null) {
            throw new Error(`Transaction with ID {id} not found.`);
        }
        return product;
    }

    save(transaction) {
        if (transaction === null || !(transaction instanceof Transaction)) {
            throw new Error("Invalid transaction type.");
        }
        const key = this.#getKey(transaction.id);
        const data = JSON.stringify(transaction);
        localStorage.setItem(key, data);
    }

    delete(id) {
        const key = this.#getKey(id);
        localStorage.removeItem(key);
    }
}