function load() {
    const vs = new ViewState();

    var inventory = new InventoryManager();
    const product = inventory.loadProduct(vs.state.selectedSku);

    document.getElementById("product-sku-label").textContent = product.sku;
    document.getElementById("product-name-label").textContent = product.name;
    document.getElementById("category-label").textContent = product.category;
    document.getElementById("manufacturer-label").textContent = product.manufacturer;
    document.getElementById("price-label").textContent = parseFloat(product.price)
        .toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN"
        });

    document.getElementById("description-label").textContent = product.description;
    document.getElementById("location-label").textContent = product.location;
    document.getElementById("weight-label").textContent = product.weight;
    document.getElementById("volume-label").textContent = product.volume;
    document.getElementById("supplier-label").textContent = product.supplier;

    document.getElementById("edit-button")
        .addEventListener("click", edit);
    
    document.getElementById("delete-button")
        .addEventListener("click", showDeleteModal);    
    document.getElementById("confirm-delete-button")
        .addEventListener("click", confirmDelete);
}

function edit(e) {
    e.preventDefault();
    const vs = new ViewState();
    vs.state.caller = "detail.html";
    vs.save();
    window.location.href = "edit.html"
}

function showDeleteModal(e) {
    e.preventDefault();
    const modal = new bootstrap.Modal(document.getElementById('confirm-delete-modal'));
    modal.show();
}

function confirmDelete(e) {
    e.preventDefault();
    const modal = bootstrap.Modal.getInstance(document.getElementById('confirm-delete-modal'));
    modal.hide();
    deleteProduct();
}

function deleteProduct() {
    const vs = new ViewState();
    const inventory = new InventoryManager();
    inventory.deleteProduct(vs.state.selectedSku);
    window.location.href = "index.html";
}

window.addEventListener("load", load);