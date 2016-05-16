export class Item {
    index: number;
    id: number;
    name:string;
    price:number;
    salePrice:number;
    quantity:number;
    description:string;
    date:Date;
    didntsell:boolean;
    constructor() {
        this.index = null;
        this.id = null;
        this.name = "";
        this.price = 0;
        this.salePrice = 0;
        this.description = "";
        this.date = new Date();
        this.didntsell = false;
    }
    public static copy(item:Item) {
        var newItem = new Item();
        newItem.index = item.index;
        newItem.id = item.id;
        newItem.name = item.name;
        newItem.price = item.price;
        newItem.salePrice = item.salePrice;
        newItem.quantity = item.quantity;
        newItem.description = item.description;
        newItem.date = item.date;
        newItem.didntsell = item.didntsell;
        return newItem;
    }
}
