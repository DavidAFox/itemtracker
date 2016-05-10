import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Item} from './item';
import {Sale} from './sale';
import {SaleDetailComponent} from './sale_detail.component'

@Component({
    selector: 'sale-modal',
    templateUrl: 'dist/templates/sale_modal.template.html',
    directives: [SaleDetailComponent]
})
export class SaleModalComponent {
    @Input() item:Item;
    @Input() sale:Sale;
    @Output() reload= new EventEmitter<number>();
    constructor() {
    }
    close(){
        $('#saleModal').modal('hide');
        this.reload.emit(this.sale.id);
        console.log("closed");
    }
}