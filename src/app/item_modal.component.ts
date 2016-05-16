import {Component, Input, Output, EventEmitter } from '@angular/core';
import {Item} from './item';
import {ItemDetailComponent} from './item_detail.component'
declare var $:any;

@Component({
    selector: 'item-modal',
    templateUrl: 'dist/templates/item_modal.template.html',
    directives: [ItemDetailComponent]
})
export class ItemModalComponent {
    @Input() item:Item;
    @Output() reload= new EventEmitter<number>();

    constructor() {
    }
    close(){
        $('#itemModal').modal('hide');
        this.reload.emit(this.item.index);
    }
}