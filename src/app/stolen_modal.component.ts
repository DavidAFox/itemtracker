import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Item} from './item';
import {Stolen} from './stolen';
import {StolenDetailComponent} from './stolen_detail.component'

@Component({
    selector: 'stolen-modal',
    templateUrl: 'dist/templates/stolen_modal.template.html',
    directives: [StolenDetailComponent]
})
export class StolenModalComponent {
    @Input() item:Item;
    @Input() stolen:Stolen;
    @Output() reload= new EventEmitter<number>();
    constructor() {
    }
    close(){
        $('#stolenModal').modal('hide');
        this.reload.emit(this.stolen.id);
        console.log("closed");
    }
}