System.register(['angular2/core', './item.service', 'angular2/router', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, item_service_1, router_1;
    var ItemListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {}],
        execute: function() {
            ItemListComponent = (function () {
                function ItemListComponent(_itemService, _router) {
                    this._itemService = _itemService;
                    this._router = _router;
                    this.showEmpty = false;
                    this.sort = '';
                    this.reversed = false;
                    this.nameMatch = false;
                    this.name = '';
                }
                ItemListComponent.prototype.getItems = function () {
                    var that = this;
                    this._itemService.getItems().subscribe(function (resp) {
                        if (resp.success) {
                            that.items = resp.data;
                        }
                        else {
                            that.error = resp.error;
                        }
                    }, function (error) { return that.error = error; });
                };
                ItemListComponent.prototype.ngOnInit = function () {
                    this.getItems();
                };
                ItemListComponent.prototype.sold = function (item) {
                    var link = ['Sold', { id: item.id }];
                    this._router.navigate(link);
                };
                ItemListComponent.prototype.stolen = function (item) {
                    var link = ['Stolen', { id: item.id }];
                    this._router.navigate(link);
                };
                ItemListComponent.prototype.hideItem = function (item) {
                    var that = this;
                    if (!this.showEmpty && item.quantity < 1) {
                        return true;
                    }
                    if (this.nameMatch && (item.name.toLowerCase().search(that.name.toLowerCase()) < 0)) {
                        return true;
                    }
                    return false;
                };
                ItemListComponent.prototype.newItem = function () {
                    var link = ["ItemNew"];
                    this._router.navigate(link);
                };
                ItemListComponent.prototype.edit = function (item) {
                    var link = ['ItemEdit', { id: item.id }];
                    this._router.navigate(link);
                };
                ItemListComponent.prototype.sortBy = function (type) {
                    var that = this;
                    if (this.sort === type) {
                        this.reversed = !this.reversed;
                    }
                    else {
                        that.reversed = false;
                        that.sort = type;
                    }
                    this.items.sort(function (a, b) {
                        var x = 1;
                        var y;
                        var z;
                        if (a[type].toLowerCase && b[type].toLowerCase) {
                            y = a[type].toLowerCase();
                            z = b[type].toLowerCase();
                        }
                        else {
                            y = a[type];
                            z = b[type];
                        }
                        if (that.reversed) {
                            x = -1;
                        }
                        if (y > z) {
                            return 1 * x;
                        }
                        else if (y < z) {
                            return -1 * x;
                        }
                        else {
                            return 0;
                        }
                    });
                };
                ItemListComponent = __decorate([
                    core_1.Component({
                        selector: 'item-list',
                        template: "\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-heading\">\n                        <h1>Items</h1>\n                    </div>\n                    <div class=\"panel-body\">\n                        <label>Show empty Items: </label><input type=\"checkbox\" [(ngModel)]=\"showEmpty\"/>\n                        <label>By Name: </label><input type=\"checkbox\" [(ngModel)]=\"nameMatch\"/>\n                        <div class=\"form-group\" *ngIf=\"nameMatch\"><label>Name</label>\n                            <input type=\"text\" [(ngModel)]=\"name\"/>\n                        </div>\n\n                        <div class=\"table-responsive\">\n                            <table class=\"table-bordered table table-hover\">\n                                <thead>\n                                    <tr>\n                                        <th (click)=\"sortBy('id')\"><label>Product #</label> \n                                            <span [hidden]=\"!(sort==='id' && reversed)\"><span class=\"glyphicon glyphicon-triangle-top\"></span></span>\n                                            <span [hidden]=\"!(sort==='id' && !reversed)\"><span class=\"glyphicon glyphicon-triangle-bottom\"></span></span>\n                                        </th>\n                                        <th (click)=\"sortBy('name')\"><label>Name</label>\n                                            <span [hidden]=\"!(sort==='name' && reversed)\"><span class=\"glyphicon glyphicon-triangle-top\"></span></span>\n                                            <span [hidden]=\"!(sort==='name' && !reversed)\"><span class=\"glyphicon glyphicon-triangle-bottom\"></span></span>\n                                        </th>    \n                                        <th (click)=\"sortBy('price')\"><label>Price</label>\n                                            <span [hidden]=\"!(sort==='price' && reversed)\"><span class=\"glyphicon glyphicon-triangle-top\"></span></span>\n                                            <span [hidden]=\"!(sort==='price' && !reversed)\"><span class=\"glyphicon glyphicon-triangle-bottom\"></span></span>\n                                        </th>\n                                        <th (click)=\"sortBy('salePrice')\"><label>Sale Price</label>\n                                            <span [hidden]=\"!(sort==='salePrice' && reversed)\"><span class=\"glyphicon glyphicon-triangle-top\"></span></span>\n                                            <span [hidden]=\"!(sort==='salePrice' && !reversed)\"><span class=\"glyphicon glyphicon-triangle-bottom\"></span></span>\n                                        </th>\n                                        <th (click)=\"sortBy('quantity')\"><label>Quantity</label>\n                                            <span [hidden]=\"!(sort==='quantity' && reversed)\"><span class=\"glyphicon glyphicon-triangle-top\"></span></span>\n                                            <span [hidden]=\"!(sort==='quantity' && !reversed)\"><span class=\"glyphicon glyphicon-triangle-bottom\"></span></span>\n                                        </th>\n                                    </tr>\n                                </thead>\n                                <tbody> \n                                    <tr *ngFor=\"#item of items\" (click)=\"edit(item)\" [hidden]=\"hideItem(item)\">\n                                        <td>{{item.id}}</td>\n                                        <td>{{item.name}}</td>\n                                        <td>{{item.price/100 | currency:'USD':true:'1.2-2'}}</td>\n                                        <td>{{item.salePrice/100 | currency:'USD':true:'1.2-2'}}</td>\n                                        <td>{{item.quantity}}</td>\n                                        <button class=\"btn btn-default\" (click)=\"sold(item)\">Sold</button>\n                                        <button class=\"btn btn-default\" (click)=\"stolen(item)\">Stolen</button>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </div>\n                        <button class=\"btn btn-default\" (click)=\"newItem()\">New Item</button>\n                        <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>         \n    ",
                        styleUrls: ['./css/item_list.css']
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, router_1.Router])
                ], ItemListComponent);
                return ItemListComponent;
            }());
            exports_1("ItemListComponent", ItemListComponent);
        }
    }
});
//# sourceMappingURL=item_list.component.js.map