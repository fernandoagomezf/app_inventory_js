
function populateList(searchText) {
    const inventory = new InventoryManager();

    const table = document.querySelector("#product-table tbody");
    table.innerHTML = "";

    let count = 0;
    const vms = inventory.getProducts(searchText);
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
        viewLink.onclick = (e) => {
            e.preventDefault();
            const vs = new ViewState();
            vs.state.selectedSku = vm.sku;
            vs.state.caller = "index.html";
            vs.save();
            window.location.href = "detail.html"
        };
        
        const editLink = document.createElement('a');
        editLink.href = 'edit.html';
        editLink.className = 'btn btn-sm btn-primary';
        editLink.textContent = 'Edit';
        editLink.onclick = (e) => {
            e.preventDefault();
            const vs = new ViewState();
            vs.state.selectedSku = vm.sku;
            vs.state.caller = "index.html";
            vs.save();
            window.location.href = "edit.html"
        };
        
        const cell = row.insertCell();
        cell.appendChild(viewLink);
        cell.appendChild(document.createTextNode(' '));
        cell.appendChild(editLink);
    }

    document.getElementById("count-text").innerHTML = count.toString();
}

function load() {
    populateList(null);    
    document.getElementById("search-text")
            .addEventListener("input", search);
}

function search() {
    const text = document.getElementById("search-text");
    populateList(text.value);
}

window.addEventListener("load", load);