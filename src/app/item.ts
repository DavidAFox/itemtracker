export class Item {
    id: number;
    name:string;
    price:number;
    salePrice:number;
    quantity:number;
    description:string;
    date:Date;
    constructor() {
        this.id = null;
        this.name = "";
        this.price = 0;
        this.salePrice = 0;
        this.description = "";
        this.date = new Date();
    }
    public static copy(item) {
        var newItem = new Item();
        newItem.id = item.id;
        newItem.name = item.name;
        newItem.price = item.price;
        newItem.salePrice = item.salePrice;
        newItem.quantity = item.quantity;
        newItem.description = item.description;
        newItem.date = item.date;
        return newItem;
    }
}
