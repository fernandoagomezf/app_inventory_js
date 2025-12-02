
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
    const panel = document.getElementById("stock-panel");
    panel.style.display = "none";
    const text = document.getElementById("search-text");
    populate(text.value);
}

function selectProduct() {
    const panel = document.getElementById("stock-panel");
    const list = document.getElementById("product-list");
    const sku = list.value;
    const vs = new ViewState();
    vs.state.selectedSku = sku;
    vs.save();

    if (sku.length <= 0) {
        panel.style.display = "none";
        return;
    } 
    
    panel.style.display = "block";
}

function cancel() {
    const vs = new ViewState();
    vs.reset();
    window.location.href = "index.html";
}

function load() {
    populate(null);
    document.getElementById("search-text")
            .addEventListener("input", search);
    document.getElementById("product-list")
            .addEventListener("change", selectProduct);
    document.getElementById("cancel-button")
            .addEventListener("click", cancel);
}

window.addEventListener("load", load);