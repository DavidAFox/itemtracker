import {Component} from 'angular2/core';
import {ItemDetailComponent} from './item_detail.component';
import {Item} from './item';
import {NgForm} from 'angular2/common';
import {ItemService} from './item.service';
import {Router} from 'angular2/router';


@Component({
    selector: 'item-new',
    template: `
    <div class="container">
        <form (ngSubmit)="save()" #itemForm="ngForm">
            <div class="form-group"><label>Product #</label><input ngControl="idControl" required class="form-control" type="number" [(ngModel)]="item.id"/></div>
            <div class="form-group"><label>Name</label><input required ngControl="nameControl" class="form-control" type="text" [(ngModel)]="item.name"/></div>
            <div class="form-group"><label>Description</label><textarea ngControl="descriptionControl" class="form-control" [(ngModel)]="item.description"></textarea></div>
            <div class="form-group"><label>Price</label><input required ngControl="priceControl" class="form-control" type="number" min="0" step=".01" [(ngModel)]="price" (ngModelChange) = "updatePrice(price)"/></div>
            <div class="form-group"><label>Sale Price</label><input ngControl="salePriceControl" class="form-control" type="number" min="0" step=".01" [(ngModel)] = "salePrice" (ngModelChange)="updateSalePrice(salePrice)"/></div>
            <div class="form-group"><label>Quantity</label><input required ngControl="quantityControl" class="form-control" type="number" min="0" [(ngModel)]="item.quantity"/></div>
            <div class="form-group"><label>Date Added</label>
                <label>M</label><input type="number" min="1" max="12" [(ngModel)]="month"/>
                <label>D</label><input type="number" min="1" max="31" [(ngModel)]="day"/>
                <label>Y</label><input type="number" min="1900" max="9999" [(ngModel)]="year"/>
            </div>
            <button class="btn btn-default" type="submit" [disabled]="!itemForm.form.valid">Save</button>
        </form>
        <div *ngIf="error" class="alert alert-danger">{{error}}</div>
    </div>
    `,
    directives: [ItemDetailComponent]
})
export class ItemNewComponent {
    private item: Item;
    private day: number;
    private month: number;
    private year: number;
    private price: number;
    private salePrice: number;
    private error;
    constructor(private _itemService:ItemService, private _router:Router) {
        var d = new Date();
        this.day = d.getDate();
        this.month = d.getMonth()+1;
        this.year = d.getFullYear();
        this.salePrice = 0;
        this.item = {id: null, name: "", price: null, salePrice: 0, quantity: 1, description: "", date: d};
    }
    save(){
        var that = this;
        this.item.date.setDate(this.day);
        this.item.date.setMonth(this.month-1);
        this.item.date.setFullYear(this.year);
        this._itemService.newItem(this.item).subscribe(res => {
            if(!res.success) {
                that.error = res.error;
            } else {
                var link = ["ItemList"];
                this._router.navigate(link);                
            }
        }, error => {
            that.error = error;
        })
    }
    updatePrice(price) {
        this.item.price = price *100;
    }
    updateSalePrice(price) {
        this.item.salePrice = price *100;
    }
}
