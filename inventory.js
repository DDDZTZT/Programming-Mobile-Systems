"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let inventory = [];
function addItem(name, id, category, price, quantity, supplierName, isPopular, comment) {
    //check id is unique
    if (inventory.some(item => item.id === id)) {
        return `Item with ID ${id} already exists.`;
    }
    const newItem = {
        name,
        id,
        category,
        price,
        quantity,
        supplierName,
        isPopular
    };
    inventory.push(newItem);
    return `Item ${name} added to inventory.`;
}
//update item by id
function updateItem(id, newQty, newPopular) {
    //search item by name
    const item = inventory.find(item => item.id === id);
    if (!item) {
        return `Item with ID ${id} not found.`;
    }
    item.quantity = newQty;
    item.isPopular = newPopular;
    return `Item ${item.id} updated with quantity ${newQty} and isPopular ${newPopular}`;
}
//delete item by id
function deleteItem(id) {
    //find item by id
    const itemIndex = inventory.findIndex(item => item.id === id);
    if (itemIndex === -1) {
        return `Item with ID ${id} not found.`;
    }
    //confirm operation
    console.log(`Are you sure you want to delete item ${id}?`);
    console.log(`Deleting....`);
    //delete item for inventory
    inventory.splice(itemIndex, 1);
    return `Item ${id} deleted.`;
}
//search item by name
function searchItem(name) {
    return inventory.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
}
//Calculate Stock status
function getStockStatus(item) {
    if (item.quantity <= 0) {
        return "Out of stock";
    }
    else if (item.quantity <= 10) {
        return "Low stock";
    }
    else {
        return "In stock";
    }
}
//# sourceMappingURL=inventory.js.map