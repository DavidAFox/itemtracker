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
}
