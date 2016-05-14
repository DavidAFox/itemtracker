import {Component} from '@angular/core';
import {Stolen} from './stolen';
import {Item} from './item';
import {ItemService} from './item.service';
import {StolenService} from './stolen.service';
import {Router, RouteParams } from '@angular/router-deprecated';
import {OnInit } from '@angular/core';
import {StolenDetailComponent} from './stolen_detail.component';

@Component({
    selector: 'stolen-edit',
    templateUrl : `/dist/templates/stolen_edit.template.html`,
    directives: [StolenDetailComponent] 
})
export class StolenEditComponent implements OnInit{
    private item = {};
    private stolen:Stolen = {id:0, quantity: 0, itemId:0, date: new Date(), price: 0};
    private error;
//    private month:number;
//    private day: number;
//    private year: number;
//    private price: number;
    constructor(private _itemService:ItemService, private _stolenService:StolenService, private _router:Router, private _routeParams: RouteParams){
        
    }
    ngOnInit(){
        var id = +this._routeParams.get('id');
        var that = this;
        if(isNaN(id)) {
            var link = ['StolenList'];
            that._router.navigate(link);
        } else {
            that._stolenService.getStolen(id).subscribe(data=>{
                that.stolen = data;
//                that.month = that.stolen.date.getMonth() + 1;
//                that.day = that.stolen.date.getDate();
//                that.year = that.stolen.date.getFullYear();
//                that.price = that.stolen.price / 100;
                that._itemService.getItem(that.stolen.itemId).subscribe(resp=>{
                    if(resp.success) {
                        that.item = resp.data;
                    } else {
                        that.error = resp.error;
                    }
                }, error=>that.error=error)
            }, error=>that.error = error)
        }
    }
    save() {
//        this.stolen.date.setDate(this.day);
//        this.stolen.date.setMonth(this.month-1);
//        this.stolen.date.setFullYear(this.year);
        var that = this;
//        that._stolenService.updateStolen(that.stolen).subscribe(resp=>{
            var link = ['StolenList'];
            that._router.navigate(link);
//        }, error=>that.error = error)
    }
//    updatePrice(price) {
//        this.stolen.price = price * 100;
//    }
}