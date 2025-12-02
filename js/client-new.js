
function load() {
    const vs = new ViewState();
    vs.state.selectedSku = null;
    vs.state.search = null;
    vs.save();

    document.getElementById("save-button")
            .addEventListener("click", save);
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
        const manager = new InventoryManager();
        const product = manager.registerProduct(sku, name);
        product.category = document.getElementById("category-list").value;
        product.manufacturer = document.getElementById("manufacturer-text").value;
        product.description = document.getElementById("description-text").value;
        product.price = document.getElementById("price-text").value;
        product.location = document.getElementById("location-text").value;
        product.supplier = document.getElementById("supplier-text").value;
        product.weight = document.getElementById("weight-text").value;
        product.volume = document.getElementById("volume-text").value;
        manager.updateProduct(product);

        window.location.href = "index.html";
    } catch (error) {
        const errors = new ErrorView();
        errors.report(error.message);
        errors.update();
    } 
}

window.addEventListener("load", load);