import {Component, OnInit} from '@angular/core';
import {ItemDetailComponent} from './item_detail.component';
import {Item} from './item';
import {NgForm} from '@angular/common';
import {ItemService} from './item.service';
import {Router} from '@angular/router-deprecated';


@Component({
    selector: 'item-new',
    templateUrl: 'dist/templates/item_new.template.html',
    directives: [ItemDetailComponent]
})
export class ItemNewComponent implements OnInit{
    private item: Item;
    private day: number;
    private month: number;
    private year: number;
    private price: number;
    private salePrice: number;
    private error;
    constructor(private _itemService:ItemService, private _router:Router) {
        var d = new Date();
        this.day = d.getDate();
        this.month = d.getMonth()+1;
        this.year = d.getFullYear();
        this.salePrice = 0;
        this.item = {id: null, name: "", price: null, salePrice: 0, quantity: 1, description: "", date: d};
    }
    ngOnInit() {
        var that = this;
        that._itemService.getNextId().subscribe(id => {
            that.item.id = id;
        }, error => {
            that.error = error;
        })
    }
    save(){
        var that = this;
        this.item.date.setDate(this.day);
        this.item.date.setMonth(this.month-1);
        this.item.date.setFullYear(this.year);
        this._itemService.newItem(this.item).subscribe(res => {
                var link = ["ItemList"];
                this._router.navigate(link);                
        }, error => {
            that.error = error;
        })
    }
    updatePrice(price) {
        this.item.price = price *100;
    }
    updateSalePrice(price) {
        this.item.salePrice = price *100;
    }
}
