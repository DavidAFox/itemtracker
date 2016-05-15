import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Item} from './item';
import {ItemService} from './item.service';

@Component({
    selector: 'item-detail',
    templateUrl: `dist/templates/item_detail.template.html`

})
export class ItemDetailComponent {
    @Input() set itemSet(item:Item) {
        this.item = item;
        this.price = item.price /100;
        this.salePrice = item.salePrice /100;
        this.day = this.item.date.getDate();
        this.month = this.item.date.getMonth()+1;
        this.year = this.item.date.getFullYear();

    }
    @Output() closer = new EventEmitter<boolean>();
    
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
            this.close()
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