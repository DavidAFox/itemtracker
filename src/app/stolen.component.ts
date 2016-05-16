import {Component} from '@angular/core';
import {RouteParams, Router } from '@angular/router-deprecated';
import {Item} from './item';
import {ItemService} from './item.service';
import {OnInit } from '@angular/core';
import {StolenService} from './stolen.service';
import {Stolen} from './stolen';

@Component({
    selector: 'stolen',
    templateUrl: 'dist/templates/stolen.template.html'
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
            that._itemService.getItem(id).subscribe(function(item) {           
                    var d = new Date();
                    that.day = d.getDate();
                    that.month = d.getMonth()+1;
                    that.year = d.getFullYear();
                    that.item = item;
                    that.price = item.price /100;
                    that.stolen = {id: 0, quantity: item.quantity, itemId: item.id, date: d, price: item.price}
            }, error => that.error = error)
        }
    }
    save() {
        this.stolen.date.setDate(this.day);
        this.stolen.date.setMonth(this.month-1);
        this.stolen.date.setFullYear(this.year);
        var that = this;
        this._stolenService.newStolen(that.stolen).subscribe(resp => {
            that.error = "";
            var link = ['ItemList'];
            that._router.navigate(link);
        }, error=>that.error = error)
    }
    updatePrice() {
        this.stolen.price = this.price *100;
    }
}