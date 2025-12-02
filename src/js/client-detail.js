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
}

function edit(e) {
    e.preventDefault();
    const vs = new ViewState();
    vs.state.caller = "detail.html";
    vs.save();
    window.location.href = "edit.html"
}


window.addEventListener("load", load);