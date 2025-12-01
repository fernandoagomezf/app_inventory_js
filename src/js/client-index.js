
function load() {
    const inventory = new InventoryManager();

    const table = document.querySelector("#product-table tbody");
    table.innerHTML = "";

    let count = 0;
    const vms = inventory.getProducts(null);
    for (const idx in vms) {
        count++;

        const vm = vms[idx];
        const row = table.insertRow();
        row.insertCell().textContent = vm.sku;
        row.insertCell().textContent = vm.name;
        row.insertCell().textContent = vm.category;
        row.insertCell().textContent = vm.quantity;
        row.insertCell().textContent = vm.price;

        const span = document.createElement("span");
        span.className = `badge ${vm.status.badge}`;
        span.textContent = vm.status.text;
        row.insertCell().appendChild(span);

        const viewLink = document.createElement('a');
        viewLink.href = 'detail.html';
        viewLink.className = 'btn btn-sm btn-secondary';
        viewLink.textContent = 'View';
        
        const editLink = document.createElement('a');
        editLink.href = 'edit.html';
        editLink.className = 'btn btn-sm btn-primary';
        editLink.textContent = 'Edit';
        
        const cell = row.insertCell();
        cell.appendChild(viewLink);
        cell.appendChild(document.createTextNode(' '));
        cell.appendChild(editLink);
    }

    document.getElementById("count-text").innerHTML = count.toString();
}

window.addEventListener("load", load);