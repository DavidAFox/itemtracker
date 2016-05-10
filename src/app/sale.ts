
export class Sale {
    id:number;
    date:Date;
    price: number;
    originalPrice: number;
    originalSalePrice: number;
    sTaxRate: number;
    quantity: number;
    fee: number;
    itemId: number;
    where: string;
    comment: string;
    constructor() {
        this.id = 0;
        this.date = new Date();
        this.price = 0;
        this.originalPrice = 0;
        this.originalSalePrice = 0;
        this.sTaxRate = 0;
        this.quantity = 0;
        this.fee = 0;
        this.itemId = 0;
        this.where = "";
        this.comment = "";
    }
    public static copy(sale:Sale) :Sale{
        var newSale = new Sale();
        newSale.id = sale.id;
        newSale.date = sale.date;
        newSale.price = sale.price;
        newSale.originalPrice = sale.originalPrice;
        newSale.originalSalePrice = sale.originalSalePrice;
        newSale.sTaxRate = sale.sTaxRate;
        newSale.quantity = sale.quantity;
        newSale.fee = sale.fee;
        newSale.itemId = sale.itemId;
        newSale.where = sale.where;
        newSale.comment = sale.comment;
        return newSale;
    }    
}
