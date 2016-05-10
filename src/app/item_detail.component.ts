import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Item} from './item';
import {ItemService} from './item.service';

@Component({
    selector: 'item-detail',
    template: `
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h3>{{item.name}}  Product # {{item.id}}</h3>
                <form (ngSubmit)="save()" #itemForm="ngForm" >
                    <div class="form-group"><label>Name</label><input ngControl="nameControl" required class="form-control input-block-level" type="text" [(ngModel)]="item.name"/></div>
                    <div class="form-group"><label>Description</label><textarea ngControl="descriptionControl" class="form-control" [(ngModel)]="item.description"></textarea></div>
                    <div class="form-group"><label>Price</label><input ngControl="priceControl" required class="form-control" type="number" min="0" step=".01" [(ngModel)]="price" (ngModelChange) = "updatePrice(price)"/></div>
                    <div class="form-group"><label>Sale Price</label><input ngControl="salePriceControl" class="form-control" type="number" min="0" step=".01" [(ngModel)]="salePrice" (ngModelChange) = "updateSalePrice(salePrice)"/></div>
                    <div class="form-group"><label>Quantity</label><input ngControl="quantityControl" required class="form-control" type="number" min="0" [(ngModel)]="item.quantity"/></div>
                    <div class="form-group"><label>Date Added</label>
                        <label>M</label><input ngControl= "monthControl" type="number" min="1" max="12" [(ngModel)]="month"/>
                        <label>D</label><input ngControl="dayControl" type="number" min="1" max="31" [(ngModel)]="day"/>
                        <label>Y</label><input ngControl="yearControl" type="number" min="1900" max="9999" [(ngModel)]="year"/>
                    </div>
                    <button type="submit" class="btn btn-default" [disabled]="!itemForm.form.valid">Save</button>
                </form>
            </div>
        </div>
        <div *ngIf="error" class="alert alert-danger">{{error}}</div>
    `

})
export class ItemDetailComponent {
    @Input()
    set itemSet(item:Item) {
        this.item = item;
        this.price = item.price /100;
        this.salePrice = item.salePrice /100;
        this.day = this.item.date.getDate();
        this.month = this.item.date.getMonth()+1;
        this.year = this.item.date.getFullYear();

    }
    @Output()
    closer = new EventEmitter<boolean>();
    private item: Item;    
    private day:number;
    private month:number;
    private year:number;
    private price: number;
    private salePrice: number;
    private error;
    constructor(private _itemService:ItemService) {        
    }
    ngOnInit() {
        var that = this;
        that.day = that.item.date.getDate();
        that.month = that.item.date.getMonth()+1;
        that.year = that.item.date.getFullYear();
        that.price = that.item.price / 100.0;
        that.salePrice = that.item.salePrice /100.0;
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
                this.close()
            }
        }, error=>this.error = error)
    }
    close() {
        this.closer.emit(true);
    }
    updatePrice(price) {
        this.item.price = price * 100;
    }
    updateSalePrice(price) {
        this.item.salePrice = price * 100;
    }
}