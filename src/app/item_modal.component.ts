import {Component, Input} from '@angular/core';
import {Item} from './item';
import {ItemDetailComponent} from './item_detail.component'

@Component({
    selector: 'item-modal',
    templateUrl: 'dist/templates/item_modal.template.html',
    directives: [ItemDetailComponent]
})
export class ItemModalComponent {
    @Input() item:Item;
    constructor() {
    }
    close(){
        $('#itemModal').modal('hide');
        console.log("closed");
    }
}