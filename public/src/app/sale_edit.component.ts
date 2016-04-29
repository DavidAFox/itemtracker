import {Component} from 'angular2/core';
import {Sale} from './sale';
import {RouteParams, Router } from 'angular2/router';
import {ItemService} from './item.service';
import {OnInit} from 'angular2/core';
import {Item} from './item';
import {SaleService} from './sale.service';

@Component({
    selector: 'sale-edit',
    template: `
    <div class="container">
        <h3>{{item.name}} #{{item.id}}</h3>
        <p>{{item.description}}</p>
        <form (ngSubmit)="save()" #saleForm="ngForm">
        <div class="form-group"><label>Handling Fee</label><input ngControl="feeControl" class="form-control" type="number" min="0"[(ngModel)]="fee" (ngModelChange)="updateFee(fee)"/></div>
        <div class="form-group"><label>Quantity Sold</label><input ngControl="quantityControl" required class="form-control" type="number" min="0" [(ngModel)]="sale.quantity"/></div>
        <div class="form-group"><label>Sales Tax Rate</label><input ngControl="sTaxRateControl" required class="form-control" type="number" min="0" [(ngModel)]="sale.sTaxRate"/></div>
        <div class="form-group"><label>Price</label><input ngControl="priceControl" required class="form-control" type="number" min="0" step=".01" [(ngModel)]="price" (ngModelChange) = "updatePrice(price)"/></div>
        <div class="form-group"><label>Date</label><br>
            <label>M</label><input ngControl="monthControl" type="number" min="1" max="12" [(ngModel)]="month"/>
            <label>D</label><input ngControl="dayControl" type="number" min="1" max="31" [(ngModel)]="day"/>
            <label>Y</label><input ngControl="yearControl" type="number" min="1900" max="9999" [(ngModel)]="year"/>
        </div>
        <div class="form-group"><label>Where</label><input ngControl="whereControl" class="form-control" type="text" [(ngModel)]="sale.where"/></div>
        <div class="form-group"><label>Comment</label><textarea ngControl="commentControl" class= "form-control" rows="5" cols="30"></textarea></div>
        <button class="btn btn-default" type="submit" [disabled]="!saleForm.form.valid">Save</button>
        </form>
        <div *ngIf="error" class="alert alert-danger">{{error}}</div>
    </div>
    `
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