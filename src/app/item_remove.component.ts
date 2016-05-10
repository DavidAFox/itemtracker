import {Component, OnInit } from '@angular/core';
import {RouteParams, Router} from '@angular/router-deprecated';
import {ItemService} from './item.service';

@Component({
    selector: 'item-remove',
    template: `
    <div class="container">
        <h3>{{item.name}} #{{item.id}}</h3>
        <form>
        <div class="form-group"><label>Quantity</label><input class="form-control" type="number" min="0" [(ngModel)]="quantity"/></div>
        <button (click)="save()">Save</button>
        </form>
    </div>
    `
})
export class ItemRemoveComponent implements OnInit{
    private item = {};
    private quantity = 0;
    constructor(private _itemService: ItemService, private _routeParams: RouteParams, private _router: Router) {
        
    }
    
    ngOnInit(){
        var that = this;
        var id = +this._routeParams.get('id');
        if(isNaN(id)) {
            var link = ['ItemList'];
            this._router.navigate(link);
        } else {
   //         this._itemService.getItem(id).then(function(item){
  //              that.item = item;
    //            that.quantity = item.quantity;
     //       })
        }
    }
    save() {
        
    }
}