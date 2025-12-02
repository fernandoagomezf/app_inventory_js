
function populate(searchText) {
    const inventory = new InventoryManager();

    const list = document.getElementById("product-list");
    list.length = 0;

    let option = document.createElement("option");
    option.text = "[Select a product]"
    option.value = "";
    list.appendChild(option);

    const vms = inventory.getProducts(searchText);
    for (const idx in vms) {
        const vm = vms[idx];

        option = document.createElement("option");
        option.value = vm.sku;
        option.text = `${vm.sku} - ${vm.name}`;
        list.appendChild(option);        
    }
}

function search() {
    const text = document.getElementById("search-text");
    populate(text.value);
}

function load() {
    populate(null);
    document.getElementById("search-text")
            .addEventListener("input", search);
}

window.addEventListener("load", load);