
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
        this._sku = sku;        
    }

    #updated() {
        this._modified = Date();
    }

    enforce() {
        if (this.sku === undefined || this.sku === null || this.sku.length === 0) {
            throw new Error("SKU cannot be empty.");
        }        
    }

    get sku() {
        return this._sku;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value ?? "";
        this.#updated();
    }
    
    get category() {
        return this._category;
    }

    set category(value) {        
        this._category = value ?? "";
        this.#updated();
    }

    get manufacturer() {
        return this._manufacturer;
    }

    set manufacturer(value) {
        this._manufacturer = value ?? "";
        this.#updated();
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value ?? "";
        this.#updated();
    }

    get price() {
        return this._price;
    }

    set price(value) {
        if (isNaN(value) || value < 0.0) {
            throw new Error("Price must be a non-negative number.");
        }
        this._price = value ?? 0.0;
        this.#updated();
    }
}

