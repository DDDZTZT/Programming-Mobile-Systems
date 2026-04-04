interface Inventory {
    name: string;//item name
    id: number; //item id
    category: string; //item category
    price: number; //item price
    quantity: number; //item quantity
    supplierName: string; //supplier name
    isPopular: boolean; //is popular
    comment?: string; //item comment
}

let inventory: Inventory []= [];

function addItem(name: string, id: number, category: string, price: number, quantity: number, supplierName: string, isPopular: boolean, comment?: string):string {
    //check id is unique
    if (inventory.some(item => item.id === id)) {
        return `Item with ID ${id} already exists.`;
    }

    const newItem: Inventory = {
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
function updateItem(id: number, newQty: number, newPopular: boolean): string{
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
function deleteItem(id: number): string{
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
function searchItem(name: string):Inventory[]{
    return inventory.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
}

//Calculate Stock status
function getStockStatus(item: Inventory): string{
    if (item.quantity <= 0) {
        return "Out of stock";
    } else if (item.quantity <= 10) {
        return "Low stock";
    } else {
        return "In stock";
    }
}


