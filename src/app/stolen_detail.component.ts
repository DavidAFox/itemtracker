import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Stolen} from './stolen';
import {Item} from './item';
import {StolenService} from './stolen.service';

@Component({
    selector: 'stolen-detail',
    templateUrl: 'dist/templates/stolen_detail.template.html'
})
export class StolenDetailComponent {
    @Input() 
    set stolenSet(stolen:Stolen) {
        this.stolen = stolen;
        this.day = this.stolen.date.getDate();
        this.month = this.stolen.date.getMonth() +1;
        this.year = this.stolen.date.getFullYear();
        this.price = this.stolen.price / 100;
    }    
    @Input()
    item: Item;
    @Output() 
    closer = new EventEmitter<boolean>();
    stolen:Stolen = new Stolen();
    private day:number;
    private month:number;
    private year:number;
    private price:number;
    private fee:number;
    private error;
    constructor(private _stolenService: StolenService) {
        
    }
    ngOnInit() {
        var that = this;
        that.day = that.stolen.date.getDate();
        that.month = that.stolen.date.getMonth() +1;
        that.year = that.stolen.date.getFullYear();
        that.price = that.stolen.price / 100;
    }
    save() {
        var that = this;
        this.stolen.date.setDate(this.day);
        this.stolen.date.setMonth(this.month-1);
        this.stolen.date.setFullYear(this.year);
        this._stolenService.updateStolen(this.stolen).subscribe(function(resp) {
            that.error = "";
            that.close();
        }, error => that.error = error)
    }
    updatePrice(price) {
        this.stolen.price = price * 100;
    }
    close() {
        this.closer.emit(true);
    }    
}