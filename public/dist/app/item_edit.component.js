System.register(['@angular/core', '@angular/router-deprecated', './item.service'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, item_service_1;
    var ItemEditComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            }],
        execute: function() {
            ItemEditComponent = (function () {
                function ItemEditComponent(_itemService, _routeParams, _router) {
                    this._itemService = _itemService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.item = { id: null, name: "", price: null, salePrice: 0, quantity: 1, description: "", date: new Date() };
                }
                ItemEditComponent.prototype.ngOnInit = function () {
                    var id = +this._routeParams.get('id');
                    var that = this;
                    if (isNaN(id)) {
                        var link = ['ItemList'];
                        that._router.navigate(link);
                    }
                    else {
                        this.getItem(id).subscribe(function (resp) {
                            if (resp.success) {
                                var item = resp.data;
                                that.item = item;
                                that.day = item.date.getDate();
                                that.month = item.date.getMonth() + 1;
                                that.year = item.date.getFullYear();
                                that.price = item.price / 100.0;
                                that.salePrice = item.salePrice / 100.0;
                            }
                            else {
                                that.error = resp.error;
                            }
                        }, function (error) { return that.error = error; });
                    }
                };
                ItemEditComponent.prototype.getItem = function (id) {
                    return this._itemService.getItem(id);
                };
                ItemEditComponent.prototype.save = function () {
                    var _this = this;
                    this.item.date.setDate(this.day);
                    this.item.date.setMonth(this.month - 1);
                    this.item.date.setFullYear(this.year);
                    //save item changes to database
                    this._itemService.updateItem(this.item).subscribe(function (res) {
                        if (!res.success) {
                            _this.error = res.error;
                        }
                        else {
                            var link = ["ItemList"];
                            _this._router.navigate(link);
                        }
                    }, function (error) { return _this.error = error; });
                };
                ItemEditComponent.prototype.updatePrice = function (price) {
                    this.item.price = price * 100;
                };
                ItemEditComponent.prototype.updateSalePrice = function (price) {
                    this.item.salePrice = price * 100;
                };
                ItemEditComponent = __decorate([
                    core_1.Component({
                        selector: 'item-edit',
                        templateUrl: 'dist/templates/item_edit.template.html'
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, router_deprecated_1.RouteParams, router_deprecated_1.Router])
                ], ItemEditComponent);
                return ItemEditComponent;
            }());
            exports_1("ItemEditComponent", ItemEditComponent);
        }
    }
});
//# sourceMappingURL=item_edit.component.js.map