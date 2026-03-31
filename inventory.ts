interface Inventory {
    name: string;//item name
    id: number; //item id
    category: string; //item category
    price: number; //item price
    quantity: number; //item quantity
    supplierName: string; //supplier name
    stockStatues: string; //stock status
    isPopular: boolean; //is popular
}
//test inventory
let inventory: Inventory []= [
    {
        name: "Item1",
        id: 1,
        category: "Category1",
        price: 100,
        quantity: 100,
        supplierName: "Supplier1",
        stockStatues: "In Stock",
        isPopular: true,
    },
]