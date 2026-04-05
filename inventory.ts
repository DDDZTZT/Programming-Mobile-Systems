interface InventoryItem {
    itemId: number;
    itemName: string;
    category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
    quantity: number;
    price: number;
    supplierName: string;
    stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
    isPopular: boolean;
    comment?: string;
}

let inventoryList: InventoryItem[] = [];

function calculateStockStatus(qty: number): 'In Stock' | 'Low Stock' | 'Out of Stock' {
  if (qty <= 0) return 'Out of Stock';
  if (qty <= 10) return 'Low Stock';
  return 'In Stock';
}

function addItem(
    itemId: number,
    itemName: string,
    category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous',
    quantity: number,
    price: number,
    supplierName: string,
    isPopular: boolean,
    comment?: string
): string {
    
if (!itemName || !category || !supplierName) {
    return 'Error: All fields except Comment are required!';
}
  if (quantity < 0 || price < 0) {
    return 'Error: Price & Quantity cannot be negative!';
}
  // check if item already exists
  if (inventoryList.some(i => i.itemId === itemId)) {
    return `Error: Item ID ${itemId} already exists!`;
}

  const newItem: InventoryItem = {
    itemId,
    itemName,
    category,
    quantity,
    price,
    supplierName,
    stockStatus: calculateStockStatus(quantity),
    isPopular,
    comment: comment || ''
  };

  inventoryList.push(newItem);
  return `Success: Item "${itemName}" added!`;
}

//update item by name
function updateItemByName(
    itemName: string,
    newQuantity: number,
    newPrice: number,
    newIsPopular: boolean
): string {
    const item = inventoryList.find(i => i.itemName.toLowerCase() === itemName.toLowerCase());
    if (!item) return `Error: Item "${itemName}" not found!`;
    if (newQuantity < 0 || newPrice < 0) return 'Error: Values cannot be negative!';

  item.quantity = newQuantity;
  item.price = newPrice;
  item.isPopular = newIsPopular;
  item.stockStatus = calculateStockStatus(newQuantity);

  return `Success: Item "${itemName}" updated!`;
}

//delete item by name
function deleteItemByName(itemName: string): string {
    const index = inventoryList.findIndex(i => i.itemName.toLowerCase() === itemName.toLowerCase());
    if (index === -1) return `Error: Item "${itemName}" not found!`;
    inventoryList.splice(index, 1);
    return `Success: Item "${itemName}" deleted!`;
}
    
//find item by name
function searchItemByName(keyword: string): InventoryItem[] {
    return inventoryList.filter(i => i.itemName.toLowerCase().includes(keyword.toLowerCase()));
}

//get all popular item
function getPopularItems(): InventoryItem[] {
    return inventoryList.filter(i => i.isPopular);
}

//render all items
function renderAllItems(): void {
    renderTable(inventoryList);
}

//render popular items
function renderPopularItems(): void {
    renderTable(getPopularItems());
}

function renderTable(items: InventoryItem[]): void {
    const container = document.getElementById('tableContainer');
    if (!container) return;
    let html = `
    <table style="width:100%; border-collapse:collapse; margin-top:16px;">
    <tr style="background:#f2f2f2;">
        <th>ID</th><th>Name</th><th>Category</th><th>Qty</th><th>Price</th>
        <th>Supplier</th><th>Stock</th><th>Popular</th><th>Comment</th>
    </tr>`;

    items.forEach(item => {
    const stockColor = item.stockStatus === 'Out of Stock' ? 'red' :item.stockStatus === 'Low Stock' ? 'orange' : 'green';

    html += `
    <tr>
        <td>${item.itemId}</td>
        <td>${item.itemName}</td>
        <td>${item.category}</td>
        <td>${item.quantity}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>${item.supplierName}</td>
        <td style="color:${stockColor}; font-weight:bold;">${item.stockStatus}</td>
        <td>${item.isPopular ? 'Yes' : 'No'}</td>
        <td>${item.comment || 'N/A'}</td>
    </tr>`;
});

html += '</table>';
container.innerHTML = html;
}

(window as any).inventoryApp = {
  addItem,
  updateItemByName,
  deleteItemByName,
  searchItemByName,
  renderAllItems,
  renderPopularItems
};