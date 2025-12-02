
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
    resetProductPanel();
    const text = document.getElementById("search-text");
    populate(text.value);
}

function resetProductPanel() {
    document.getElementById("stock-panel").style.display = "none";
    document.getElementById("product-name-label").textContent = "-";
    document.getElementById("category-label").innerHTML = `<strong>Category: </strong> -`;
    document.getElementById("price-label").innerHTML = `<strong>Price: </strong> -`;
    document.getElementById("location-label").innerHTML = `<strong>Location: </strong> -`;
    document.getElementById("stock-label").textContent = "-";
}

function resetAdjustementPanel() {
    document.getElementById("adjustement-type-list").selectedIndex = 0;
    document.getElementById("quantity-text").textContent = 0;
}

function addQuantity() {
    const text = document.getElementById("quantity-text");
    let quantity = parseInt(text.value);
    if (isNaN(quantity)) {
        quantity = 0;
    } else {
        quantity++;
    }
    text.value = quantity;
}

function removeQuantity() {
    const text = document.getElementById("quantity-text");
    let quantity = parseInt(text.value);
    if (isNaN(quantity) || quantity <= 0) {
        quantity = 0;
    } else {
        quantity--;
    }
    text.value = quantity;
}

function selectProduct() {
    const panel = document.getElementById("stock-panel");
    const list = document.getElementById("product-list");
    const sku = list.value;
    const vs = new ViewState();
    vs.state.selectedSku = sku;
    vs.save();

    if (sku.length <= 0) {        
        resetProductPanel();
        return;
    } 

    const manager = new InventoryManager();
    const inventory = manager.getInventory(sku);
    
    document.getElementById("product-name-label").textContent = inventory.name;
    document.getElementById("category-label").innerHTML = `<strong>Category: </strong> ${inventory.category}`;
    document.getElementById("price-label").innerHTML = `<strong>Price: </strong> ${inventory.price}`;
    document.getElementById("location-label").innerHTML = `<strong>Location: </strong> ${inventory.location}`;
    document.getElementById("stock-label").textContent = inventory.quantity;
    panel.style.display = "block";
}

function cancel() {
    const vs = new ViewState();
    vs.reset();
    window.location.href = "index.html";
}

function confirm() {

}

function load() {
    populate(null);
    document.getElementById("search-text")
            .addEventListener("input", search);
    document.getElementById("product-list")
            .addEventListener("change", selectProduct);
    document.getElementById("cancel-button")
            .addEventListener("click", cancel);
    document.getElementById("add-button")
            .addEventListener("click", addQuantity);
    document.getElementById("remove-button")
            .addEventListener("click", removeQuantity);
    document.getElementById("confirm-button")
            .addEventListener("click", confirm);
}

window.addEventListener("load", load);