import {Component} from 'angular2/core';
import {RouteParams } from 'angular2/router';
import {Router } from 'angular2/router';
import {Item} from './item';
import {ItemService} from './item.service';
import {OnInit } from 'angular2/core';
import {StolenService} from './stolen.service';
import {Stolen} from './stolen';

@Component({
    selector: 'stolen',
    template: `
        <div class="container">
        <h3>{{item.name}} #{{item.id}}</h3>
            <form>
            <div class="form-group"><label>Quantity</label><input class="form-control" type="number" min="0"[(ngModel)]="stolen.quantity"/></div>
            <div class="form-group"><label>Date</label>
                <label>M</label><input type="number" min="1" max="12" [(ngModel)]="month"/>
                -<label>D</label><input type="number" min="1" max="31" [(ngModel)]="day"/>
                -<label>Y</label><input type="number" min="1900" [(ngModel)]="year"/>
            </div>
            <div class="form-group"><label>Price</label><input class="form-control" type="number" min="0" [(ngModel)]="price" (ngModelChange) = "updatePrice(price)"/></div>
            <button (click)="save()">Save</button>
        </form>
        <div *ngIf="error" class="alert alert-danger">{{error}}</div>

        </div>
    `
})
export class StolenComponent implements OnInit{
    private item = {};
    private stolen:Stolen = {id: 0, quantity: 0, itemId: 0, date: new Date(), price: 0};
    private day:number;
    private month: number;
    private year:number;
    private error;
    private price:number;
    constructor(private _itemService: ItemService, private _stolenService: StolenService, private _routeParams: RouteParams, private _router: Router){
        
    }
    ngOnInit(){
        var id = +this._routeParams.get('id');
        var that = this;
        if(isNaN(id)) {
            var link = ['ItemList'];
            that._router.navigate(link);
        } else {
            that._itemService.getItem(id).subscribe(function(resp) {
                if(resp.success) {
                    var item = resp.data;
                    var d = new Date();
                    that.day = d.getDate();
                    that.month = d.getMonth()+1;
                    that.year = d.getFullYear();
                    that.item = item;
                    that.price = item.price /100;
                    that.stolen = {id: 0, quantity: item.quantity, itemId: item.id, date: d, price: item.price}
                } else {
                    that.error = resp.error;
                }
            }, error => that.error = error)
        }
    }
    save() {
        this.stolen.date.setDate(this.day);
        this.stolen.date.setMonth(this.month-1);
        this.stolen.date.setFullYear(this.year);
        var that = this;
        this._stolenService.newStolen(that.stolen).subscribe(resp => {
            var link = ['ItemList'];
            that._router.navigate(link);
        }, error=>that.error = error)
    }
    updatePrice() {
        this.stolen.price = this.price *100;
    }
}