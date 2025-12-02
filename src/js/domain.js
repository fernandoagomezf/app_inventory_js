
class Product {
    #_id = "";
    #_sku = "";
    #_name = "";
    #_category = "";
    #_manufacturer = "";
    #_description = "";
    #_price = 0.0;
    #_location = "";
    #_supplier = "";
    #_weight = 0.0;
    #_volume = 0.0;

    constructor(sku) {
        if (sku === undefined || sku === null || sku.length === 0) {
            throw new Error("SKU cannot be empty.");
        }  
        this.#_sku = sku;        
        this.#_id = crypto.randomUUID();
    }

    get id() {
        return this.#_id;
    }

    get sku() {
        return this.#_sku;
    }

    get name() {
        return this.#_name;
    }

    set name(value) {
        this.#_name = value ?? "";
    }
    
    get category() {
        return this.#_category;
    }

    set category(value) {        
        this.#_category = value ?? "";
    }

    get manufacturer() {
        return this.#_manufacturer;
    }

    set manufacturer(value) {
        this.#_manufacturer = value ?? "";
    }

    get description() {
        return this.#_description;
    }

    set description(value) {
        this.#_description = value ?? "";
    }

    get price() {
        return this.#_price;
    }

    set price(value) {
        if (isNaN(value) || value < 0.0) {
            throw new Error("Price must be a non-negative number.");
        }
        this.#_price = value ?? 0.0;
    }

    get location() {
        return this.#_location;
    }

    set location(value) {
        this.#_location = value ?? "";
    }

    get supplier() {
        return this.#_supplier;
    }

    set supplier(value) {
        this.#_supplier = value ?? "";
    }

    get weight() {
        return this.#_weight;
    }

    set weight(value) {
        if (value < 0.0) {
            throw new Error("Weight cannot be negative.");
        }
        this.#_weight = value;
    }

    get volume() {
        return this.#_volume;
    }

    set volume(value) {
        if (value < 0.0) {
            throw new Error("Volume cannot be negative.");
        }
        this.#_volume = value;
    }


    matches(search) {
        if (search === null) {
            return true;
        }

        const searchText = search.toLowerCase();
        return this.name.toLowerCase().includes(searchText) 
            || this.sku.toLowerCase().includes(searchText)
            || this.category.toLowerCase().includes(searchText);
    }

    static of(obj) {
        const product = new Product(obj.sku);
        product.#_id = obj.id;
        product.name = obj.name;
        product.category = obj.category;
        product.manufacturer = obj.manufacturer;
        product.description = obj.description;
        product.price = obj.price;
        product.location = obj.location;
        product.supplier = obj.supplier;
        product.weight = obj.weight;
        product.volume = obj.volume;
        return product;
    }
}

class Stock {
    #_sku = null;
    #_quantity = 0;

    constructor(sku) {
        if (sku === null || typeof sku !== 'string' || sku.length === 0) {
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

    lowStock() {
        return this.#_quantity > 0 && this.#_quantity < 5;
    }

    static of(obj) {
        const stock = new Stock(obj.sku);
        stock.quantity = obj.quantity;
        return stock;
    }
}

class Transaction {
    #_id = null;
    #_sku = "";
    #_price = 0.0;
    #_quantity = 0;
    #_total = 0.0;
    #_date = "";
    #_type = 0;
    #_reason = "";
    #_notes = "";

    constructor(sku, quantity, price, type) {
        if (isNaN(quantity) || quantity === 0) {
            throw new Error("Quantity must be a non-zero number.");
        }
        if (isNaN(price) || price < 0.0) {
            throw new Error("Price must not be a negative number.");
        }
        if (type !== Transaction.TYPE_INCREASE && type !== Transaction.TYPE_DECREASE) {
            throw new Error("Invalid transaction type.")
        }
        this.#_id = crypto.randomUUID();
        this.#_sku = sku;
        this.#_quantity = quantity;
        this.#_price = price;
        this.#_type = type;
        this.#_total = quantity * price;
        const date = new Date();
        this.#_date = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
    }

    static TYPE_INCREASE = 1;
    static TYPE_DECREASE = -1;

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

    get type() {
        return this.#_type;
    }

    get total() {
        return this.#_total;
    }

    get reason() {
        return this.#_reason;
    }

    set reason(value) {
        this.#_reason = value ?? "";
    }

    get notes() {
        return this.#_notes;
    }

    set notes(value) {
        return this.#_notes = value ?? "";
    }

    static of(obj) {
        const transaction = new Transaction(
            obj.sku, 
            obj.quantity, 
            obj.price, 
            obj.type,
        );
        transaction.#_id = obj.id;
        transaction.#_date = obj.date;
        transaction.#_reason = obj.reason;
        transaction.#_notes = obj.notes;

        return transaction;
    }
}

