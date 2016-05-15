import {Component} from '@angular/core';
import {Sale} from './sale';
import {RouteParams, Router } from '@angular/router-deprecated';
import {ItemService} from './item.service';
import {OnInit} from '@angular/core';
import {Item} from './item';
import {SaleService} from './sale.service';
import {SaleDetailComponent} from './sale_detail.component';

@Component({
    selector: 'sale-edit',
    templateUrl: 'dist/templates/sale_edit.template.html',
    directives: [SaleDetailComponent]
})
export class SaleEditComponent {
    private sale:Sale = {
                    id: null, 
                    price: 0, 
                    originalPrice: 0, 
                    originalSalePrice: 0, 
                    sTaxRate: .075, 
                    quantity: 1, 
                    fee: 0, 
                    itemId: 0, 
                    date: new Date(),
                    where: "", 
                    comment: ""
                };
    private item = {};
    private error;
    constructor(private _itemService: ItemService, private _saleService: SaleService, private _routeParams: RouteParams, private _router: Router) {
        
    }
    ngOnInit() {
        var that = this;
        var id = +this._routeParams.get('id');
        if(isNaN(id)) {
            var link = ['SaleList'];
            that._router.navigate(link);
        } else {
            that._saleService.getSale(id).subscribe(function(sale) {
                    that.sale = sale;
                    that._itemService.getItem(sale.itemId).subscribe(function(item){
                            that.item = item;
                    }, error=>that.error = error)
            }, error=>that.error = error)
        }
    }
    save() {
        var that = this;
                var link = ['SaleList'];
                that._router.navigate(link);
  }
}