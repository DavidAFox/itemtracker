import {Item} from './item';
import {Component} from '@angular/core';
import {RouteParams, Router} from '@angular/router-deprecated';
import {ItemService} from './item.service';
import {OnInit} from '@angular/core';


@Component({
    selector: 'item-edit',
    templateUrl: 'dist/templates/item_edit.template.html' 
})
export class ItemEditComponent {
    private item:Item = {id: null, name: "", price: null, salePrice: 0, quantity: 1, description: "", date: new Date()};
    private day:number;
    private month:number;
    private year:number;
    private price: number;
    private salePrice: number;
    private error;
    constructor(private _itemService:ItemService, private _routeParams: RouteParams, private _router: Router) {        
    }
    ngOnInit() {
        var id = +this._routeParams.get('id');
        var that = this;
        if(isNaN(id)) {
            var link = ['ItemList'];
            that._router.navigate(link);
        } else {
            this.getItem(id).subscribe(function(resp) {
                if(resp.success) {
                    var item = resp.data
                    that.item = item;
                    that.day = item.date.getDate();
                    that.month = item.date.getMonth()+1;
                    that.year = item.date.getFullYear();
                    that.price = item.price / 100.0;
                    that.salePrice = item.salePrice /100.0;
                } else {
                    that.error = resp.error
                }
            }, error=> that.error = error)
        }
    }
    getItem(id: number) {
        return this._itemService.getItem(id);
    }
    save() {
        this.item.date.setDate(this.day);
        this.item.date.setMonth(this.month-1);
        this.item.date.setFullYear(this.year);
        //save item changes to database
        this._itemService.updateItem(this.item).subscribe(res => {
            if(!res.success) {
                this.error = res.error;
            } else {
                var link = ["ItemList"];
                this._router.navigate(link);                                
            }
        }, error=>this.error = error)
    }
    updatePrice(price) {
        this.item.price = price * 100;
    }
    updateSalePrice(price) {
        this.item.salePrice = price * 100;
    }
}