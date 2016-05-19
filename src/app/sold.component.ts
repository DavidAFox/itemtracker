import {Component} from '@angular/core';
import {RouteParams, Router} from '@angular/router-deprecated';
import {ItemService} from './item.service';
import {SaleService} from './sale.service';
import {OnInit} from '@angular/core';
import {Item} from './item';
import {Sale} from './sale';

@Component({
    templateUrl: 'dist/templates/sold.template.html',
    selector: 'sold'
})
export class SoldComponent implements OnInit{
    private sale:Sale = {
                    id: 0, 
                    price: 0, 
                    originalPrice: 0, 
                    originalSalePrice: 0, 
                    sTaxRate: .0725, 
                    quantity: 1, 
                    fee: 0, 
                    itemId: 0, 
                    date: new Date(),
                    where: "", 
                    comment: ""
                };
    private item = {};
    private day:number;
    private month:number;
    private year:number;
    private price:number;
    private fee:number;
    private error;
    constructor(private _itemService:ItemService, private _saleService: SaleService, private _routeParams: RouteParams, private _router: Router) {        
    }
    ngOnInit() {
        var id = +this._routeParams.get('id');
        var that = this;
        if(isNaN(id)) {
            var link = ['ItemList']
            that._router.navigate(link);
        }else {
            that.getItem(id).subscribe(function(item) {                
                    that.item = item;
                    var d = new Date();
                    var price = 0;
                    if(item.salePrice > 0) {
                        price = item.salePrice;
                    } else {
                        price = item.price;
                    }
                    that.price = price / 100;
                    that.fee = 0;
                    var s:Sale = {
                        id: 0, 
                        price: price, 
                        originalPrice: item.price, 
                        originalSalePrice: item.salePrice, 
                        sTaxRate: .0725, 
                        quantity: 1, 
                        fee: 0, 
                        itemId: item.index, 
                        date: d,
                        where: "", 
                        comment: ""
                    }                
                    that.sale = s;
                    that.day = d.getDate();
                    that.month = d.getMonth() +1;
                    that.year = d.getFullYear();
            }, error => that.error = error)
        }
    }
    getItem(id: number) {
        return this._itemService.getItemById(id);
    }
    save() {
        //check that item quantity >= sold quantity
        //save sale to database
        this.sale.date.setDate(this.day);
        this.sale.date.setMonth(this.month-1);
        this.sale.date.setFullYear(this.year);
        var that = this;
        this._saleService.newSale(this.sale).subscribe(function(sale){
                that.error = "";
                var link = ['SaleList']
                that._router.navigate(link);                
        }, error => that.error = error)
    }
    updatePrice(price) {
        this.sale.price = price * 100;
    }
    updateFee(fee) {
        this.sale.fee = fee * 100;
    }
}