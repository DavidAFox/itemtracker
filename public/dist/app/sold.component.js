System.register(['@angular/core', '@angular/router-deprecated', './item.service', './sale.service'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, item_service_1, sale_service_1;
    var SoldComponent;
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
            },
            function (sale_service_1_1) {
                sale_service_1 = sale_service_1_1;
            }],
        execute: function() {
            SoldComponent = (function () {
                function SoldComponent(_itemService, _saleService, _routeParams, _router) {
                    this._itemService = _itemService;
                    this._saleService = _saleService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.sale = {
                        id: 0,
                        price: 0,
                        originalPrice: 0,
                        originalSalePrice: 0,
                        sTaxRate: .0725,
                        quantity: 1,
                        fee: 0,
                        itemId: 0,
                        date: new Date(),
                        where: "",
                        comment: ""
                    };
                    this.item = {};
                }
                SoldComponent.prototype.ngOnInit = function () {
                    var id = +this._routeParams.get('id');
                    var that = this;
                    if (isNaN(id)) {
                        var link = ['ItemList'];
                        that._router.navigate(link);
                    }
                    else {
                        that.getItem(id).subscribe(function (item) {
                            that.item = item;
                            var d = new Date();
                            var price = 0;
                            if (item.salePrice > 0) {
                                price = item.salePrice;
                            }
                            else {
                                price = item.price;
                            }
                            that.price = price / 100;
                            that.fee = 0;
                            var s = {
                                id: 0,
                                price: price,
                                originalPrice: item.price,
                                originalSalePrice: item.salePrice,
                                sTaxRate: .0725,
                                quantity: 1,
                                fee: 0,
                                itemId: item.id,
                                date: d,
                                where: "",
                                comment: ""
                            };
                            that.sale = s;
                            that.day = d.getDate();
                            that.month = d.getMonth() + 1;
                            that.year = d.getFullYear();
                        }, function (error) { return that.error = error; });
                    }
                };
                SoldComponent.prototype.getItem = function (id) {
                    return this._itemService.getItemById(id);
                };
                SoldComponent.prototype.save = function () {
                    //check that item quantity >= sold quantity
                    //save sale to database
                    this.sale.date.setDate(this.day);
                    this.sale.date.setMonth(this.month - 1);
                    this.sale.date.setFullYear(this.year);
                    var that = this;
                    this._saleService.newSale(this.sale).subscribe(function (sale) {
                        that.error = "";
                        var link = ['SaleList'];
                        that._router.navigate(link);
                    }, function (error) { return that.error = error; });
                };
                SoldComponent.prototype.updatePrice = function (price) {
                    this.sale.price = price * 100;
                };
                SoldComponent.prototype.updateFee = function (fee) {
                    this.sale.fee = fee * 100;
                };
                SoldComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'dist/templates/sold.template.html',
                        selector: 'sold'
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, sale_service_1.SaleService, router_deprecated_1.RouteParams, router_deprecated_1.Router])
                ], SoldComponent);
                return SoldComponent;
            }());
            exports_1("SoldComponent", SoldComponent);
        }
    }
});
//# sourceMappingURL=sold.component.js.map