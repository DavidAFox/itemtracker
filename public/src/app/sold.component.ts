import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {ItemService} from './item.service';
import {SaleService} from './sale.service';
import {OnInit} from 'angular2/core';
import {Item} from './item';
import {Sale} from './sale';
import {Router} from 'angular2/router';

@Component({
    template: `
    <div class="container">
        <h3>{{item.name}} #{{item.id}}</h3>
        <p>{{item.description}}</p>
        <form (ngSubmit)="save()" #saleForm="ngForm">
        <div class="form-group"><label>Handling Fee</label><input ngControl="feeControl" class="form-control" type="number" min="0" [(ngModel)]="fee" (ngModelChange)="updateFee(fee)"/></div>
        <div class="form-group"><label>Quantity Sold</label><input ngControl="quantityControl" required class="form-control" type="number" min="0" [(ngModel)]="sale.quantity"/></div>
        <div class="form-group"><label>Sales Tax Rate</label><input ngControl="sTaxRateControl" required class="form-control" type="number" min="0" step=".0001"[(ngModel)]="sale.sTaxRate"/></div>
        <div class="form-group"><label>Price</label><input ngControl="priceControl" required class="form-control" type="number" min="0" [(ngModel)]="price" (ngModelChange) = "updatePrice(price)"/></div>
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
    `,
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
        console.log(id);
        var that = this;
        if(isNaN(id)) {
            var link = ['ItemList']
            that._router.navigate(link);
        }else {
            that.getItem(id).subscribe(function(resp) {                
                if(resp.success) {
                    var item = resp.data;
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
                        itemId: item.id, 
                        date: d,
                        where: "", 
                        comment: ""
                    }                
                    that.sale = s;
                    that.day = d.getDate();
                    that.month = d.getMonth() +1;
                    that.year = d.getFullYear();
                } else {
                    that.error = resp.error;
                }
            }, error => that.error = error)
        }
    }
    getItem(id: number) {
        return this._itemService.getItem(id);
    }
    save() {
        //check that item quantity >= sold quantity
        //save sale to database
        this.sale.date.setDate(this.day);
        this.sale.date.setMonth(this.month-1);
        this.sale.date.setFullYear(this.year);
        var that = this;
        this._saleService.newSale(this.sale).subscribe(function(resp){
            if(resp.success) {
                var link = ['SaleList']
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