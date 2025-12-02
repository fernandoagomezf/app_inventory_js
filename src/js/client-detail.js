
function load() {
    const vs = new ViewState();

    const manager = new InventoryManager();
    const product = manager.loadProduct(vs.state.selectedSku);
    const transactions = manager.getStockTransactions(vs.state.selectedSku);

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

    const table = document.querySelector("#transaction-table tbody");
    let html = "";
    for (const idx in transactions) {
        const transaction = transactions[idx];
        const type = transaction.type > 0 ? 
            "<span class='badge bg-success'>In</span>" :
            "<span class='badge bg-danger'>Out</span>";
        const total = transaction.total
            .toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN"
        });
        const notes = transaction.notes.length > 0 ? transaction.notes : "-";
        html += "<tr>";
        html += `<td>${transaction.date}</td>`;
        html += `<td>${type}</td>`;
        html += `<td>${transaction.quantity}</td>`;
        html += `<td>${total}</td>`;
        html += `<td>${transaction.reason.toUpperCase()}</td>`;
        html += `<td>${notes}</td>`;
        html += "</tr>";
    }
    table.innerHTML = html;
    

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