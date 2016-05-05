import {Component} from 'angular2/core';
import {ItemService} from './item.service';
import {OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {Item} from './item';
import 'rxjs/Rx'
@Component ({
    selector: 'item-list',
    template: `
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h1>Items</h1>
                    </div>
                    <div class="panel-body">
                        <label>Show empty Items: </label><input type="checkbox" [(ngModel)]="showEmpty"/>
                        <label>By Name: </label><input type="checkbox" [(ngModel)]="nameMatch"/>
                        <div class="form-group" *ngIf="nameMatch"><label>Name</label>
                            <input type="text" [(ngModel)]="name"/>
                        </div>

                        <div class="table-responsive">
                            <table class="table-bordered table table-hover">
                                <thead>
                                    <tr>
                                        <th (click)="sortBy('id')"><label>Product #</label> 
                                            <span [hidden]="!(sort==='id' && reversed)"><span class="glyphicon glyphicon-triangle-top"></span></span>
                                            <span [hidden]="!(sort==='id' && !reversed)"><span class="glyphicon glyphicon-triangle-bottom"></span></span>
                                        </th>
                                        <th (click)="sortBy('name')"><label>Name</label>
                                            <span [hidden]="!(sort==='name' && reversed)"><span class="glyphicon glyphicon-triangle-top"></span></span>
                                            <span [hidden]="!(sort==='name' && !reversed)"><span class="glyphicon glyphicon-triangle-bottom"></span></span>
                                        </th>    
                                        <th (click)="sortBy('price')"><label>Price</label>
                                            <span [hidden]="!(sort==='price' && reversed)"><span class="glyphicon glyphicon-triangle-top"></span></span>
                                            <span [hidden]="!(sort==='price' && !reversed)"><span class="glyphicon glyphicon-triangle-bottom"></span></span>
                                        </th>
                                        <th (click)="sortBy('salePrice')"><label>Sale Price</label>
                                            <span [hidden]="!(sort==='salePrice' && reversed)"><span class="glyphicon glyphicon-triangle-top"></span></span>
                                            <span [hidden]="!(sort==='salePrice' && !reversed)"><span class="glyphicon glyphicon-triangle-bottom"></span></span>
                                        </th>
                                        <th (click)="sortBy('quantity')"><label>Quantity</label>
                                            <span [hidden]="!(sort==='quantity' && reversed)"><span class="glyphicon glyphicon-triangle-top"></span></span>
                                            <span [hidden]="!(sort==='quantity' && !reversed)"><span class="glyphicon glyphicon-triangle-bottom"></span></span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody> 
                                    <tr *ngFor="#item of items" (click)="edit(item)" [hidden]="hideItem(item)">
                                        <td>{{item.id}}</td>
                                        <td>{{item.name}}</td>
                                        <td>{{item.price/100 | currency:'USD':true:'1.2-2'}}</td>
                                        <td>{{item.salePrice/100 | currency:'USD':true:'1.2-2'}}</td>
                                        <td>{{item.quantity}}</td>
                                        <button class="btn btn-default" (click)="sold(item)">Sold</button>
                                        <button class="btn btn-default" (click)="stolen(item)">Stolen</button>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button class="btn btn-default" (click)="newItem()">New Item</button>
                        <div *ngIf="error" class="alert alert-danger">{{error}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>         
    `,
    styleUrls: ['./css/item_list.css']
})
export class ItemListComponent implements OnInit{
    private items:Item[];
    private error;
    private showEmpty = false;
    private sort = '';
    private reversed = false;
    private nameMatch = false;
    private name:string = '';
    constructor(private _itemService: ItemService, private _router:Router) {
    }
    getItems() {
        var that = this;
        this._itemService.getItems().subscribe(resp => {
            if(resp.success) {
                that.items = resp.data;
            } else {
                that.error = resp.error;
            }
        }, error => that.error = <any>error);
    }
    ngOnInit() {
        this.getItems();
    }
    sold(item) {
        var link = ['Sold', {id:item.id}];
        this._router.navigate(link);
    }
    stolen(item) {
        var link = ['Stolen', {id: item.id}];
        this._router.navigate(link);
    }
    hideItem(item:Item) {
        var that = this;
        if(!this.showEmpty && item.quantity < 1) {
            return true;
        }
        if(this.nameMatch && (item.name.toLowerCase().search(that.name.toLowerCase()) < 0)) {
            return true;
        }
        return false;
    }
    newItem() {
        var link = ["ItemNew"];
        this._router.navigate(link);
    }
    edit(item) {
        var link = ['ItemEdit', {id: item.id}];
        this._router.navigate(link);
    }
    sortBy(type) {
        var that = this;
        if(this.sort === type) {
            this.reversed = !this.reversed;
        } else {
            that.reversed = false;
            that.sort = type;
        }

        this.items.sort(function(a, b){
            var x = 1;
            var y;
            var z;
            if(a[type].toLowerCase && b[type].toLowerCase) {
                y = a[type].toLowerCase();
                z = b[type].toLowerCase();                
            }else {
                y = a[type];
                z = b[type];
            }
            if(that.reversed) {
                x = -1;
            }
            if(y > z) {
                return 1*x;
            }else if(y < z) {
                return -1*x;
            }else {
                return 0;
            }
        })
    }
}