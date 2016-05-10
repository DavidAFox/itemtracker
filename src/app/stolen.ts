

export class Stolen {
    id:number
    itemId:number
    quantity:number
    date:Date
    price:number
    constructor() {
        this.id=0;
        this.itemId=0;
        this.quantity=0;
        this.date=new Date();
        this.price=0;
    }
    public static copy(stolen:Stolen):Stolen {
        var newStolen = new Stolen();
        newStolen.id = stolen.id;
        newStolen.itemId = stolen.itemId;
        newStolen.quantity = stolen.quantity;
        newStolen.date = stolen.date;
        newStolen.price = stolen.price;
        return newStolen;
    }
}