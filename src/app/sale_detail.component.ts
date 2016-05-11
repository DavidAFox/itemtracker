import {Component, Input, EventEmitter, Output} from '@angular/core';
import {SaleService} from './sale.service';
import {Sale} from './sale';
import {Item} from './item';

@Component({
    selector: 'sale-detail',
    template: `
        <h3>{{item.name}} #{{item.id}}</h3>
        <p>{{item.description}}</p>
        <form (ngSubmit)="save()" #saleForm="ngForm">
        <div class="form-group"><label>Handling Fee</label><input ngControl="feeControl" class="form-control" type="number" min="0" step=".01" [(ngModel)]="fee" (ngModelChange)="updateFee(fee)"/></div>
        <div class="form-group"><label>Quantity Sold</label><input ngControl="quantityControl" required class="form-control" type="number" min="0" [(ngModel)]="sale.quantity"/></div>
        <div class="form-group"><label>Sales Tax Rate</label><input ngControl="sTaxRateControl" required class="form-control" type="number" min="0" step=".0001" [(ngModel)]="sale.sTaxRate"/></div>
        <div class="form-group"><label>Price</label><input ngControl="priceControl" required class="form-control" type="number" min="0" step=".01" [(ngModel)]="price" (ngModelChange) = "updatePrice(price)"/></div>
        <div class="form-group"><label>Date</label><br>
            <label>M</label><input ngControl="monthControl" type="number" min="1" max="12" [(ngModel)]="month"/>
            <label>D</label><input ngControl="dayControl" type="number" min="1" max="31" [(ngModel)]="day"/>
            <label>Y</label><input ngControl="yearControl" type="number" min="1900" max="9999" [(ngModel)]="year"/>
        </div>
        <div class="form-group"><label>Where</label><input ngControl="whereControl" class="form-control" type="text" [(ngModel)]="sale.where"/></div>
        <div class="form-group"><label>Comment</label><textarea ngControl="commentControl" class= "form-control" rows="5" cols="30" [(ngModel)]="sale.comment"></textarea></div>
        <button class="btn btn-primary" type="submit" [disabled]="!saleForm.form.valid">Save</button>
        </form>
        <div *ngIf="error" class="alert alert-danger">{{error}}</div>
    `
})
export class SaleDetailComponent {
    @Input() 
    set saleSet(sale:Sale) {
        this.sale = sale;
        this.day = this.sale.date.getDate();
        this.month = this.sale.date.getMonth() +1;
        this.year = this.sale.date.getFullYear();
        this.price = this.sale.price / 100;
        this.fee = this.sale.fee / 100;        
    }
    
    @Input()
    item: Item;
    @Output() 
    closer = new EventEmitter<boolean>();
    sale: Sale = new Sale();
    private day:number;
    private month:number;
    private year:number;
    private price:number;
    private fee:number;
    private error;
    constructor(private _saleService: SaleService) {
        
    }
    ngOnInit() {
        var that = this;
        that.day = that.sale.date.getDate();
        that.month = that.sale.date.getMonth() +1;
        that.year = that.sale.date.getFullYear();
        that.price = that.sale.price / 100;
        that.fee = that.sale.fee / 100;
    }
    save() {
        var that = this;
        this.sale.date.setDate(this.day);
        this.sale.date.setMonth(this.month-1);
        this.sale.date.setFullYear(this.year);
        this._saleService.updateSale(this.sale).subscribe(function(resp) {
            if(resp.success) {
                that.close()
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
    close() {
        this.closer.emit(true);
    }    
}