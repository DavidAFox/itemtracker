import {Component} from '@angular/core';
import {Sale} from './sale';
import {RouteParams, Router } from '@angular/router-deprecated';
import {ItemService} from './item.service';
import {OnInit} from '@angular/core';
import {Item} from './item';
import {SaleService} from './sale.service';

@Component({
    selector: 'sale-edit',
    templateUrl: 'dist/templates/sale_edit.template.html'
})
export class SaleEditComponent {
    private sale:Sale = {
                    id: 0, 
                    price: 0, 
                    originalPrice: 0, 
                    originalSalePrice: 0, 
                    sTaxRate: .075, 
                    quantity: 1, 
                    fee: 0, 
                    itemId: 0, 
                    date: new Date(),
                    where: "", 
                    comment: ""
                };
    private day:number;
    private month:number;
    private year:number;
    private item = {};
    private price:number;
    private fee:number;
    private error;
    constructor(private _itemService: ItemService, private _saleService: SaleService, private _routeParams: RouteParams, private _router: Router) {
        
    }
    ngOnInit() {
        var that = this;
        var id = +this._routeParams.get('id');
        if(isNaN(id)) {
            var link = ['SaleList'];
            that._router.navigate(link);
        } else {
            that._saleService.getSale(id).subscribe(function(resp) {
                if(resp.success) {
                    var sale = resp.data;
                    that.sale = sale;
                    that._itemService.getItem(sale.itemId).subscribe(function(itemResp){
                        if(itemResp.success) {
                            that.item = itemResp.data;
                        } else {
                            that.error = itemResp.error;
                        }
                    }, error=>that.error = error)
                    that.day = sale.date.getDate();
                    that.month = sale.date.getMonth() +1;
                    that.year = sale.date.getFullYear();
                    that.price = sale.price / 100;
                    that.fee = sale.fee / 100;
                } else {
                    that.error = resp.error;
                }
            }, error=>that.error = error)
        }
    }
    save() {
        var that = this;
        this.sale.date.setDate(this.day);
        this.sale.date.setMonth(this.month-1);
        this.sale.date.setFullYear(this.year);
        this._saleService.updateSale(this.sale).subscribe(function(resp) {
            if(resp.success) {
                var link = ['SaleList'];
                that._router.navigate(link);
            } else {
                that.error = resp.error;
            }    
        }, error => that.error = error)
    }
    updatePrice(price) {
        this.sale.price = price * 100;
    }
    updateFee(fee) {
        this.sale.fee = fee * 100;
    }
}