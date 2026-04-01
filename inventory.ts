interface Inventory {
    name: string;//item name
    id: number; //item id
    category: string; //item category
    price: number; //item price
    quantity: number; //item quantity
    supplierName: string; //supplier name
    stockStatus: string; //stock status
    isPopular: boolean; //is popular
}

let inventory: Inventory []= [];

function addItem(name: string, id: number, category: string, price: number, quantity: number, supplierName: string, stockStatus: string, isPopular: boolean) {
    //check if id already exists
    const isDuplicate = inventory.some(item => item.id === id);

    if(isDuplicate) {
        console.log(`Item with ID ${id} already exists.`);
        return;
    } else {
        //add item to inventory
        const newItem: Inventory = {
            name,
            id,
            category,
            price,
            quantity,
            supplierName,
            stockStatus,
            isPopular,
        }
        inventory.push(newItem);
        console.log(`Item ${name} added to inventory.`);
        return;
    }
}

function displayAll():void{
    console.table(inventory);
}

function searchByName(name: string):void{
    //search item by name
    const foundItem = inventory.find(item => item.name === name);
    if (foundItem) {
        console.log(`Item found: ${JSON.stringify(foundItem)}`);
    } else {
        console.log(`Item with name ${name} not found.`);
    }
}

function updateByName(oldName: string, newName: string, newQty: number): boolean {
    // Find item by old name
    const itemIndex = inventory.findIndex(item => item.name === oldName);
    
    if (itemIndex === -1) {
        console.log(`Item with name ${oldName} not found.`);
        return false;
    } else {
        // Update item data
        inventory[itemIndex].name = newName;
        inventory[itemIndex].quantity = newQty;
        console.log(`Item ${oldName} updated to ${newName} with quantity ${newQty}.`);
        return true;
    }
}

function deleteByName(name: string): void {
    //find item bu name
    const itemIndex = inventory.findIndex(item => item.name === name);
    if (itemIndex === -1) {
        console.log(`Item with name ${name} not found.`);
        return;
    } 

    //confirm operation
    console.log(`Are you sure you want to delete item ${name}?`);
    console.log(`Deleting....`);

    //delete item for inventory
    inventory.splice(itemIndex, 1);
    console.log(`Item ${name} deleted.`);
}

addItem('laptop',1,'computer',10000,100,'Supplier1','In Stock',true);
addItem('desktop',2,'computer',20000,200,'Supplier2','In Stock',false); 
displayAll();
searchByName('laptop');
deleteByName('desktop');
displayAll();
