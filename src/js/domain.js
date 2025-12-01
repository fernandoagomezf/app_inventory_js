
class Product {
    #_sku = "";
    #_name = "";
    #_category = "";
    #_manufacturer = "";
    #_description = "";
    #_price = 0.0;
    #_modified = Date();

    constructor(sku) {
        if (sku === undefined) {
            throw new Error("The 'sku' is required to create a product.");
        }
        this.#_sku = sku;        
    }

    #updated() {
        this.#_modified = Date();
    }

    enforce() {
        if (this.#_sku === undefined || this.#_sku === null || this.#_sku.length === 0) {
            throw new Error("SKU cannot be empty.");
        }        
    }

    get sku() {
        return this.#_sku;
    }

    get name() {
        return this.#_name;
    }

    set name(value) {
        this.#_name = value ?? "";
        this.#updated();
    }
    
    get category() {
        return this.#_category;
    }

    set category(value) {        
        this.#_category = value ?? "";
        this.#updated();
    }

    get manufacturer() {
        return this.#_manufacturer;
    }

    set manufacturer(value) {
        this.#_manufacturer = value ?? "";
        this.#updated();
    }

    get description() {
        return this.#_description;
    }

    set description(value) {
        this.#_description = value ?? "";
        this.#updated();
    }

    get price() {
        return this.#_price;
    }

    set price(value) {
        if (isNaN(value) || value < 0.0) {
            throw new Error("Price must be a non-negative number.");
        }
        this.#_price = value ?? 0.0;
        this.#updated();
    }

    get modified() {
        return this.#_modified;
    }
}

class Stock {
    #_sku = null;
    #_quantity = 0;

    constructor(sku) {
        if (sku === null || !(sku instanceof String) || sku.length === 0) {
            throw new Error("Invalid SKU.");
        }
        this.#_sku = sku;
    }

    get sku() {
        return this.#_sku;
    }

    get quantity() {
        return this.#_quantity;
    }

    set quantity(value) {
        if (isNaN(value) || value < 0) {
            throw new Error("Quantity must be a non-negative number.");
        }
        this.#_quantity = value;
    }

    inStock() {
        return this.#_quantity > 0;
    }

    outOfStock() {
        return this.#_quantity === 0;
    }
}

class Transaction {
    #_id = null;
    #_sku = "";
    #_price = 0.0;
    #_quantity = 0;
    #_total = 0.0;
    #_date = Date();

    constructor(sku, quantity, price, factor) {
        if (isNaN(quantity) || quantity === 0) {
            throw new Error("Quantity must be a non-zero number.");
        }
        if (isNaN(price) || price >= 0) {
            throw new Error("Price must not be be a negative number.");
        }
        if (factor !== Transaction.POS && factor !== Transaction.NEG) {
            throw new Error("Factor can only be either 1 or -1.")
        }
        this.#_id = crypto.randomUUID();
        this.#_sku = sku;
        this.#_quantity = quantity;
        this.#_price = price;        
        this.#_total = factor * quantity * price;
    }

    static POS = 1;
    static NEG = -1;

    get id() {
        return this.#_id;
    }

    get sku() {
        return this.#_sku;
    }

    get date() {
        return this.#_date;
    }

    get quantity() {
        return this.#_quantity;
    }

    get price () {
        return this.#_price;
    }

    get total() {
        return this.#_total;
    }
}

