var inventoryList = [];
function calculateStockStatus(qty) {
    if (qty <= 0)
        return 'Out of Stock';
    if (qty <= 10)
        return 'Low Stock';
    return 'In Stock';
}
function addItem(itemId, itemName, category, quantity, price, supplierName, isPopular, comment) {
    if (!itemName || !category || !supplierName) {
        return 'Error: All fields except Comment are required!';
    }
    if (quantity < 0 || price < 0) {
        return 'Error: Price & Quantity cannot be negative!';
    }
    // check if item already exists
    if (inventoryList.some(function (i) { return i.itemId === itemId; })) {
        return "Error: Item ID ".concat(itemId, " already exists!");
    }
    var newItem = {
        itemId: itemId,
        itemName: itemName,
        category: category,
        quantity: quantity,
        price: price,
        supplierName: supplierName,
        stockStatus: calculateStockStatus(quantity),
        isPopular: isPopular,
        comment: comment || ''
    };
    inventoryList.push(newItem);
    return "Success: Item \"".concat(itemName, "\" added!");
}
//update item by name
function updateItemByName(itemName, newQuantity, newPrice, newIsPopular) {
    var item = inventoryList.find(function (i) { return i.itemName.toLowerCase() === itemName.toLowerCase(); });
    if (!item)
        return "Error: Item \"".concat(itemName, "\" not found!");
    if (newQuantity < 0 || newPrice < 0)
        return 'Error: Values cannot be negative!';
    item.quantity = newQuantity;
    item.price = newPrice;
    item.isPopular = newIsPopular;
    item.stockStatus = calculateStockStatus(newQuantity);
    return "Success: Item \"".concat(itemName, "\" updated!");
}
//delete item by name
function deleteItemByName(itemName) {
    var index = inventoryList.findIndex(function (i) { return i.itemName.toLowerCase() === itemName.toLowerCase(); });
    if (index === -1)
        return "Error: Item \"".concat(itemName, "\" not found!");
    inventoryList.splice(index, 1);
    return "Success: Item \"".concat(itemName, "\" deleted!");
}
//find item by name
function searchItemByName(keyword) {
    return inventoryList.filter(function (i) { return i.itemName.toLowerCase().includes(keyword.toLowerCase()); });
}
//get all popular item
function getPopularItems() {
    return inventoryList.filter(function (i) { return i.isPopular; });
}
//render all items
function renderAllItems() {
    renderTable(inventoryList);
}
//render popular items
function renderPopularItems() {
    renderTable(getPopularItems());
}
function renderTable(items) {
    var container = document.getElementById('tableContainer');
    if (!container)
        return;
    var html = "\n    <table style=\"width:100%; border-collapse:collapse; margin-top:16px;\">\n    <tr style=\"background:#f2f2f2;\">\n        <th>ID</th><th>Name</th><th>Category</th><th>Qty</th><th>Price</th>\n        <th>Supplier</th><th>Stock</th><th>Popular</th><th>Comment</th>\n    </tr>";
    items.forEach(function (item) {
        var stockColor = item.stockStatus === 'Out of Stock' ? 'red' : item.stockStatus === 'Low Stock' ? 'orange' : 'green';
        html += "\n    <tr>\n        <td>".concat(item.itemId, "</td>\n        <td>").concat(item.itemName, "</td>\n        <td>").concat(item.category, "</td>\n        <td>").concat(item.quantity, "</td>\n        <td>$").concat(item.price.toFixed(2), "</td>\n        <td>").concat(item.supplierName, "</td>\n        <td style=\"color:").concat(stockColor, "; font-weight:bold;\">").concat(item.stockStatus, "</td>\n        <td>").concat(item.isPopular ? 'Yes' : 'No', "</td>\n        <td>").concat(item.comment || 'N/A', "</td>\n    </tr>");
    });
    html += '</table>';
    container.innerHTML = html;
}
window.inventoryApp = {
    addItem: addItem,
    updateItemByName: updateItemByName,
    deleteItemByName: deleteItemByName,
    searchItemByName: searchItemByName,
    renderAllItems: renderAllItems,
    renderPopularItems: renderPopularItems
};
