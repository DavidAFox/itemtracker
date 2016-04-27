import {Item} from './item';
import {Component} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {ItemService} from './item.service';
import {OnInit} from 'angular2/core';
import {ItemDetailComponent} from './item_detail.component';


@Component({
    selector: 'item-edit',
    template: `
    <div class="container">
        <form>
            <div class="form-group"><label>Product #</label><input required class="form-control" type="number" [(ngModel)]="item.id"/></div>
            <div class="form-group"><label>Name</label><input required class="form-control" type="text" [(ngModel)]="item.name"/></div>
            <div class="form-group"><label>Description</label><textarea class="form-control" [(ngModel)]="item.description"></textarea></div>
            <div class="form-group"><label>Price</label><input required class="form-control" type="number" min="0" [(ngModel)]="price" (ngModelChange) = "updatePrice(price)"/></div>
            <div class="form-group"><label>Sale Price</label><input class="form-control" type="number" min="0" [(ngModel)]="salePrice" (ngModelChange) = "updateSalePrice(salePrice)"/></div>
            <div class="form-group"><label>Quantity</label><input required class="form-control" type="number" min="0" [(ngModel)]="item.quantity"/></div>
            <div class="form-group"><label>Date Added</label>
                <label>M</label><input type="number" min="1" max="12" [(ngModel)]="month"/>
                <label>D</label><input type="number" min="1" max="31" [(ngModel)]="day"/>
                <label>Y</label><input type="number" min="1900" max="9999" [(ngModel)]="year"/>
            </div>
            <button (click)="save()">Save</button>
        </form>
        <div *ngIf="error" class="alert alert-danger">{{error}}</div>

    </div>
    `,
    directives: [ItemDetailComponent]
})
export class ItemEditComponent {
    private item:Item = {id: null, name: "", price: null, salePrice: 0, quantity: 1, description: "", date: new Date()};
    private saved = {id: "not saved"};
    private day:number;
    private month:number;
    private year:number;
    private price: number;
    private salePrice: number;
    private error;
    constructor(private _itemService:ItemService, private _routeParams: RouteParams, private _router: Router) {        
    }
    ngOnInit() {
        var id = +this._routeParams.get('id');
        var that = this;
        if(isNaN(id)) {
            var link = ['ItemList'];
            that._router.navigate(link);
        } else {
            this.getItem(id).subscribe(function(resp) {
                if(resp.success) {
                    var item = resp.data
                    that.item = item;
                    that.day = item.date.getDate();
                    that.month = item.date.getMonth()+1;
                    that.year = item.date.getFullYear();
                    that.price = item.price / 100.0;
                    that.salePrice = item.salePrice /100.0;
                } else {
                    that.error = resp.error
                }
            }, error=> that.error = error)
        }
    }
    getItem(id: number) {
        return this._itemService.getItem(id);
    }
    save() {
        this.item.date.setDate(this.day);
        this.item.date.setMonth(this.month-1);
        this.item.date.setFullYear(this.year);
        //save item changes to database
        this._itemService.updateItem(this.item).subscribe(res => {
            if(!res.success) {
                this.error = res.error;
            } else {
                var link = ["ItemList"];
                this._router.navigate(link);                                
            }
        }, error=>this.error = error)
    }
    updatePrice(price) {
        this.item.price = price * 100;
    }
    updateSalePrice(price) {
        this.item.salePrice = price * 100;
    }
}