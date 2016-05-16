import {Component, Input, EventEmitter, Output} from '@angular/core';
import {SaleService} from './sale.service';
import {Sale} from './sale';
import {Item} from './item';

@Component({
    selector: 'sale-detail',
    templateUrl: 'dist/templates/sale_detail.template.html' 
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
        this._saleService.updateSale(this.sale).subscribe(function(sale) {
                that.error = "";
                that.close()
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