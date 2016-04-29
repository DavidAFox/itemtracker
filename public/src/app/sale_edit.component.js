System.register(['angular2/core', 'angular2/router', './item.service', './sale.service'], function(exports_1, context_1) {
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
    var core_1, router_1, item_service_1, sale_service_1;
    var SaleEditComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            },
            function (sale_service_1_1) {
                sale_service_1 = sale_service_1_1;
            }],
        execute: function() {
            SaleEditComponent = (function () {
                function SaleEditComponent(_itemService, _saleService, _routeParams, _router) {
                    this._itemService = _itemService;
                    this._saleService = _saleService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.sale = {
                        id: 0,
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
                    this.item = {};
                }
                SaleEditComponent.prototype.ngOnInit = function () {
                    var that = this;
                    var id = +this._routeParams.get('id');
                    if (isNaN(id)) {
                        var link = ['SaleList'];
                        that._router.navigate(link);
                    }
                    else {
                        that._saleService.getSale(id).subscribe(function (resp) {
                            if (resp.success) {
                                var sale = resp.data;
                                that.sale = sale;
                                that._itemService.getItem(sale.itemId).subscribe(function (itemResp) {
                                    if (itemResp.success) {
                                        that.item = itemResp.data;
                                    }
                                    else {
                                        that.error = itemResp.error;
                                    }
                                }, function (error) { return that.error = error; });
                                that.day = sale.date.getDate();
                                that.month = sale.date.getMonth() + 1;
                                that.year = sale.date.getFullYear();
                                that.price = sale.price / 100;
                                that.fee = sale.fee / 100;
                            }
                            else {
                                that.error = resp.error;
                            }
                        }, function (error) { return that.error = error; });
                    }
                };
                SaleEditComponent.prototype.save = function () {
                    var that = this;
                    this.sale.date.setDate(this.day);
                    this.sale.date.setMonth(this.month - 1);
                    this.sale.date.setFullYear(this.year);
                    this._saleService.updateSale(this.sale).subscribe(function (resp) {
                        if (resp.success) {
                            var link = ['SaleList'];
                            that._router.navigate(link);
                        }
                        else {
                            that.error = resp.error;
                        }
                    }, function (error) { return that.error = error; });
                };
                SaleEditComponent.prototype.updatePrice = function (price) {
                    this.sale.price = price * 100;
                };
                SaleEditComponent.prototype.updateFee = function (fee) {
                    this.sale.fee = fee * 100;
                };
                SaleEditComponent = __decorate([
                    core_1.Component({
                        selector: 'sale-edit',
                        template: "\n    <div class=\"container\">\n        <h3>{{item.name}} #{{item.id}}</h3>\n        <p>{{item.description}}</p>\n        <form (ngSubmit)=\"save()\" #saleForm=\"ngForm\">\n        <div class=\"form-group\"><label>Handling Fee</label><input ngControl=\"feeControl\" class=\"form-control\" type=\"number\" min=\"0\"[(ngModel)]=\"fee\" (ngModelChange)=\"updateFee(fee)\"/></div>\n        <div class=\"form-group\"><label>Quantity Sold</label><input ngControl=\"quantityControl\" required class=\"form-control\" type=\"number\" min=\"0\" [(ngModel)]=\"sale.quantity\"/></div>\n        <div class=\"form-group\"><label>Sales Tax Rate</label><input ngControl=\"sTaxRateControl\" required class=\"form-control\" type=\"number\" min=\"0\" [(ngModel)]=\"sale.sTaxRate\"/></div>\n        <div class=\"form-group\"><label>Price</label><input ngControl=\"priceControl\" required class=\"form-control\" type=\"number\" min=\"0\" step=\".01\" [(ngModel)]=\"price\" (ngModelChange) = \"updatePrice(price)\"/></div>\n        <div class=\"form-group\"><label>Date</label><br>\n            <label>M</label><input ngControl=\"monthControl\" type=\"number\" min=\"1\" max=\"12\" [(ngModel)]=\"month\"/>\n            <label>D</label><input ngControl=\"dayControl\" type=\"number\" min=\"1\" max=\"31\" [(ngModel)]=\"day\"/>\n            <label>Y</label><input ngControl=\"yearControl\" type=\"number\" min=\"1900\" max=\"9999\" [(ngModel)]=\"year\"/>\n        </div>\n        <div class=\"form-group\"><label>Where</label><input ngControl=\"whereControl\" class=\"form-control\" type=\"text\" [(ngModel)]=\"sale.where\"/></div>\n        <div class=\"form-group\"><label>Comment</label><textarea ngControl=\"commentControl\" class= \"form-control\" rows=\"5\" cols=\"30\"></textarea></div>\n        <button class=\"btn btn-default\" type=\"submit\" [disabled]=\"!saleForm.form.valid\">Save</button>\n        </form>\n        <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, sale_service_1.SaleService, router_1.RouteParams, router_1.Router])
                ], SaleEditComponent);
                return SaleEditComponent;
            }());
            exports_1("SaleEditComponent", SaleEditComponent);
        }
    }
});
//# sourceMappingURL=sale_edit.component.js.map