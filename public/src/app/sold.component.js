System.register(['angular2/core', 'angular2/router', './item.service', './sale.service', './sale_detail.component'], function(exports_1, context_1) {
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
    var core_1, router_1, item_service_1, sale_service_1, router_2, sale_detail_component_1;
    var SoldComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            },
            function (sale_service_1_1) {
                sale_service_1 = sale_service_1_1;
            },
            function (sale_detail_component_1_1) {
                sale_detail_component_1 = sale_detail_component_1_1;
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
                    console.log(id);
                    var that = this;
                    if (isNaN(id)) {
                        var link = ['ItemList'];
                        that._router.navigate(link);
                    }
                    else {
                        that.getItem(id).subscribe(function (resp) {
                            if (resp.success) {
                                var item = resp.data;
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
                            }
                            else {
                                that.error = resp.error;
                            }
                        }, function (error) { return that.error = error; });
                    }
                };
                SoldComponent.prototype.getItem = function (id) {
                    return this._itemService.getItem(id);
                };
                SoldComponent.prototype.save = function () {
                    //check that item quantity >= sold quantity
                    //save sale to database
                    this.sale.date.setDate(this.day);
                    this.sale.date.setMonth(this.month - 1);
                    this.sale.date.setFullYear(this.year);
                    var that = this;
                    this._saleService.newSale(this.sale).subscribe(function (resp) {
                        if (resp.success) {
                            var link = ['SaleList'];
                            that._router.navigate(link);
                        }
                        else {
                            that.error = resp.error;
                        }
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
                        template: "\n    <div class=\"container\">\n        <h3>{{item.name}} #{{item.id}}</h3>\n        <p>{{item.description}}</p>\n        <form>\n        <div class=\"form-group\"><label>Handling Fee</label><input class=\"form-control\" type=\"number\" min=\"0\" [(ngModel)]=\"fee\" (ngModelChange)=\"updateFee(fee)\"/></div>\n        <div class=\"form-group\"><label>Quantity Sold</label><input class=\"form-control\" type=\"number\" min=\"0\" [(ngModel)]=\"sale.quantity\"/></div>\n        <div class=\"form-group\"><label>Sales Tax Rate</label><input class=\"form-control\" type=\"number\" min=\"0\" step=\".0001\"[(ngModel)]=\"sale.sTaxRate\"/></div>\n        <div class=\"form-group\"><label>Price</label><input class=\"form-control\" type=\"number\" min=\"0\" [(ngModel)]=\"price\" (ngModelChange) = \"updatePrice(price)\"/></div>\n        <div class=\"form-group\"><label>Date</label><br>\n            <label>M</label><input type=\"number\" min=\"1\" max=\"12\" [(ngModel)]=\"month\"/>\n            <label>D</label><input  type=\"number\" min=\"1\" max=\"31\" [(ngModel)]=\"day\"/>\n            <label>Y</label><input  type=\"number\" min=\"1900\" max=\"9999\" [(ngModel)]=\"year\"/>\n        </div>\n        <div class=\"form-group\"><label>Where</label><input class=\"form-control\" type=\"text\" [(ngModel)]=\"sale.where\"/></div>\n        <div class=\"form-group\"><label>Comment</label><textarea class= \"form-control\" rows=\"5\" cols=\"30\"></textarea></div>\n        <button class=\"btn btn-default\" (click)=\"save()\">Save</button>\n        </form>\n        <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n    </div>\n    ",
                        selector: 'sold',
                        directives: [sale_detail_component_1.SaleDetailComponent]
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, sale_service_1.SaleService, router_1.RouteParams, router_2.Router])
                ], SoldComponent);
                return SoldComponent;
            }());
            exports_1("SoldComponent", SoldComponent);
        }
    }
});
//# sourceMappingURL=sold.component.js.map