System.register(['@angular/core', './item.service', './sale.service', '@angular/router-deprecated'], function(exports_1, context_1) {
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
    var core_1, item_service_1, sale_service_1, router_deprecated_1;
    var SalesTaxComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            },
            function (sale_service_1_1) {
                sale_service_1 = sale_service_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            }],
        execute: function() {
            SalesTaxComponent = (function () {
                function SalesTaxComponent(_itemService, _saleService, _router) {
                    this._itemService = _itemService;
                    this._saleService = _saleService;
                    this._router = _router;
                    this.sales = [];
                    this.itemNames = {};
                    this.datesSelected = true;
                    this.startDate = new Date();
                    this.startDate.setMonth(Math.floor(this.startDate.getMonth() / 3) * 3);
                    this.startDate.setDate(1);
                    this.endDate = new Date();
                    this.endDate.setMonth(Math.floor(this.startDate.getMonth()) + 3);
                    this.endDate.setDate(0);
                    this.startMonth = this.startDate.getMonth() + 1;
                    this.startDay = this.startDate.getDate();
                    this.startYear = this.startDate.getFullYear();
                    this.endMonth = this.endDate.getMonth() + 1;
                    this.endDay = this.endDate.getDate();
                    this.endYear = this.endDate.getFullYear();
                    this.endDate.setHours(23);
                    this.endDate.setMinutes(59);
                    this.startDate.setHours(0);
                    this.startDate.setMinutes(0);
                }
                SalesTaxComponent.prototype.ngOnInit = function () {
                    this.getSalesWithDates(this.startDate, this.endDate);
                };
                SalesTaxComponent.prototype.updateDates = function () {
                    this.startDate.setMonth(this.startMonth - 1);
                    this.startDate.setDate(this.startDay);
                    this.startDate.setFullYear(this.startYear);
                    this.endDate.setMonth(this.endMonth - 1);
                    this.endDate.setDate(this.endDay);
                    this.endDate.setFullYear(this.endYear);
                    this.endDate.setHours(23);
                    this.endDate.setMinutes(59);
                    this.startDate.setHours(0);
                    this.startDate.setMinutes(0);
                    if (this.datesSelected) {
                        this.getSalesWithDates(this.startDate, this.endDate);
                    }
                    else {
                        this.getSales();
                    }
                };
                SalesTaxComponent.prototype.updateSales = function () {
                    if (this.datesSelected) {
                        this.getSalesWithDates(this.startDate, this.endDate);
                    }
                    else {
                        this.getSales();
                    }
                };
                SalesTaxComponent.prototype.getSales = function () {
                    var that = this;
                    this._saleService.getSales().subscribe(function (resp) {
                        if (resp.success) {
                            that.sales = resp.data;
                            that.sales.forEach(function (sale) {
                                that._itemService.getItem(sale.itemId).subscribe(function (itemResp) {
                                    if (itemResp.success) {
                                        that.itemNames[sale.itemId] = itemResp.data.name;
                                    }
                                    else {
                                        that.error = itemResp.error;
                                    }
                                });
                            });
                        }
                        else {
                            that.error = resp.error;
                        }
                    }, function (error) { return that.error = error; });
                };
                SalesTaxComponent.prototype.getSalesWithDates = function (start, end) {
                    var that = this;
                    this._saleService.getSales(start, end).subscribe(function (resp) {
                        if (resp.success) {
                            that.sales = resp.data;
                            that.sales.forEach(function (sale) {
                                that._itemService.getItem(sale.itemId).subscribe(function (itemResp) {
                                    if (itemResp.success) {
                                        that.itemNames[sale.itemId] = itemResp.data.name;
                                    }
                                    else {
                                        that.error = itemResp.error;
                                    }
                                });
                            });
                        }
                        else {
                            that.error = resp.error;
                        }
                    }, function (error) { return that.error = error; });
                };
                SalesTaxComponent.prototype.total = function (sales) {
                    return sales.reduce(function (total, sale) {
                        return total + (sale.price * sale.quantity * sale.sTaxRate);
                    }, 0);
                };
                SalesTaxComponent.prototype.edit = function (sale) {
                    var link = ['SaleEdit', { id: sale.id }];
                    this._router.navigate(link);
                };
                SalesTaxComponent = __decorate([
                    core_1.Component({
                        selector: "sales-tax",
                        templateUrl: "/dist/templates/sales_tax.template.html"
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, sale_service_1.SaleService, router_deprecated_1.Router])
                ], SalesTaxComponent);
                return SalesTaxComponent;
            }());
            exports_1("SalesTaxComponent", SalesTaxComponent);
        }
    }
});
//# sourceMappingURL=sales_tax.component.js.map