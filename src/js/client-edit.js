
function load() {
    const vs = new ViewState();

    var inventory = new InventoryManager();
    const product = inventory.loadProduct(vs.state.selectedSku);

    document.getElementById("product-sku-text").value = product.sku;
    document.getElementById("product-name-text").value = product.name;
    document.getElementById("category-list").value = product.category;
    document.getElementById("manufacturer-text").value = product.manufacturer;
    document.getElementById("description-text").value = product.description;
    document.getElementById("price-text").value = product.price;
    document.getElementById("location-text").value = product.location;
    document.getElementById("supplier-text").value = product.supplier;
    document.getElementById("weight-text").value = product.weight;
    document.getElementById("volume-text").value = product.volume;

    document.getElementById("save-button")
            .addEventListener("click", save);
    document.getElementById("cancel-button")
            .addEventListener("click", cancel);
}

function validate(sku, name, price) {
    const errors = new ErrorView();    
    if (sku === null || sku.length <= 0) {
        errors.report("The SKU is mandatory.");
    }    
    if (name === null || name.length <= 0) {
        errors.report("The product name is mandatory.");
    }
    if (price === null || isNaN(price)) {
        errors.report("The unit price must be a valid number.");
    }
    if (price <= 0.0) {
        errors.report("The price is mandatory and cannot be zero or a negative number.");
    }
    
    errors.update();
    return !errors.has();
}

function save() {
    const sku = document.getElementById("product-sku-text").value;
    const name = document.getElementById("product-name-text").value;
    const price = document.getElementById("price-text").value;
    
    const valid = validate(sku, name, parseFloat(price));
    if (!valid) {
        return;
    }
    
    try {
        const vs = new ViewState();
        const inventory = new InventoryManager();
        const product = inventory.loadProduct(vs.state.selectedSku);
        product.category = document.getElementById("category-list").value;
        product.name = name;
        product.manufacturer = document.getElementById("manufacturer-text").value;
        product.description = document.getElementById("description-text").value;
        product.price = price;
        product.location = document.getElementById("location-text").value;
        product.supplier = document.getElementById("supplier-text").value;
        product.weight = document.getElementById("weight-text").value;
        product.volume = document.getElementById("volume-text").value;
        inventory.updateProduct(product);

        window.location.href = vs.state.caller ?? "detail.html";
    } catch (error) {
        const errors = new ErrorView();
        errors.report(error.message);
        errors.update();
    } 
}

function cancel() {
    const vs = new ViewState();
    window.location.href = vs.state.caller ?? "detail.html";
}

window.addEventListener("load", load);