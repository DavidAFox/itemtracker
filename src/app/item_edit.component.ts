import {Item} from './item';
import {Component} from '@angular/core';
import {RouteParams, Router} from '@angular/router-deprecated';
import {ItemService} from './item.service';
import {OnInit} from '@angular/core';
import {ItemDetailComponent} from './item_detail.component';

@Component({
    selector: 'item-edit',
    templateUrl: 'dist/templates/item_edit.template.html' ,
    directives: [ItemDetailComponent]
})
export class ItemEditComponent {
    private item:Item = {id: null, name: "", price: null, salePrice: 0, quantity: 1, description: "", date: new Date()};
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
                    that.item = resp.data
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
        var link = ["ItemList"];
        this._router.navigate(link);                                
    }
}