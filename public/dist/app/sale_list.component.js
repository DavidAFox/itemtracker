System.register(['@angular/core', './sale.service', './item.service', '@angular/router-deprecated', './sale', './item', './sale_modal.component'], function(exports_1, context_1) {
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
    var core_1, sale_service_1, item_service_1, router_deprecated_1, sale_1, item_1, sale_modal_component_1;
    var SaleListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (sale_service_1_1) {
                sale_service_1 = sale_service_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (sale_1_1) {
                sale_1 = sale_1_1;
            },
            function (item_1_1) {
                item_1 = item_1_1;
            },
            function (sale_modal_component_1_1) {
                sale_modal_component_1 = sale_modal_component_1_1;
            }],
        execute: function() {
            SaleListComponent = (function () {
                function SaleListComponent(_saleService, _itemService, _router) {
                    this._saleService = _saleService;
                    this._itemService = _itemService;
                    this._router = _router;
                    this.sales = [];
                    this.itemNames = {};
                    this.items = {};
                    this.datesSelected = false;
                    this.location = '';
                    this.locationSelected = false;
                    this.sort = '';
                    this.reversed = false;
                    this.selectedSale = new sale_1.Sale();
                    this.selectedItem = new item_1.Item();
                    this.startDate = new Date();
                    this.startDate.setMonth(this.startDate.getMonth() - 1);
                    this.endDate = new Date();
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
                SaleListComponent.prototype.ngOnInit = function () {
                    this.getSales();
                };
                SaleListComponent.prototype.updateDates = function () {
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
                SaleListComponent.prototype.updateSales = function () {
                    if (this.datesSelected) {
                        this.getSalesWithDates(this.startDate, this.endDate);
                    }
                    else {
                        this.getSales();
                    }
                };
                SaleListComponent.prototype.getSales = function () {
                    var that = this;
                    this._saleService.getSales().subscribe(function (resp) {
                        if (resp.success) {
                            that.sales = resp.data;
                            that.sales.forEach(function (sale) {
                                that._itemService.getItem(sale.itemId).subscribe(function (itemResp) {
                                    if (itemResp.success) {
                                        that.itemNames[sale.itemId] = itemResp.data.name;
                                        that.items[sale.id] = itemResp.data;
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
                    this.sort = '';
                    this.reversed = false;
                };
                SaleListComponent.prototype.getSalesWithDates = function (start, end) {
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
                    this.sort = '';
                    this.reversed = false;
                };
                SaleListComponent.prototype.edit = function (sale) {
                    this.selectedSale = sale_1.Sale.copy(sale);
                    this.selectedItem = item_1.Item.copy(this.items[sale.id]);
                    $('#saleModal').modal('show');
                    //        var link = ['SaleEdit', {id: sale.id}];
                    //        this._router.navigate(link);
                };
                SaleListComponent.prototype.hidden = function (sale) {
                    var that = this;
                    if (that.locationSelected && !that.locMatch(sale.where)) {
                        return true;
                    }
                    return false;
                };
                SaleListComponent.prototype.total = function (sales) {
                    var that = this;
                    return sales.reduce(function (total, sale) {
                        if (that.hidden(sale)) {
                            return total;
                        }
                        return total + (sale.price * sale.quantity);
                    }, 0);
                };
                SaleListComponent.prototype.locMatch = function (where) {
                    return where.toLocaleLowerCase().search(this.location.toLocaleLowerCase()) != -1;
                };
                SaleListComponent.prototype.reload = function (id) {
                    var that = this;
                    this.sales.forEach(function (sale, index) {
                        if (sale.id === id) {
                            that._saleService.getSale(id).subscribe(function (resp) {
                                if (resp.success) {
                                    that.sales[index] = resp.data;
                                }
                                else {
                                    that.error = resp.error;
                                }
                            }, function (error) { return that.error = error; });
                        }
                    });
                };
                SaleListComponent.prototype.sortBy = function (type) {
                    var that = this;
                    if (this.sort === type) {
                        this.reversed = !this.reversed;
                    }
                    else {
                        that.reversed = false;
                        that.sort = type;
                    }
                    this.sales.sort(function (a, b) {
                        var x = 1;
                        var y;
                        var z;
                        if (a[type] && b[type] && a[type].toLowerCase && b[type].toLowerCase) {
                            y = a[type].toLowerCase();
                            z = b[type].toLowerCase();
                        }
                        else if (type === 'name') {
                            y = that.itemNames[a['itemId']].toLowerCase();
                            z = that.itemNames[b['itemId']].toLowerCase();
                        }
                        else if (type === 'totalSale') {
                            y = a.price * a.quantity;
                            z = b.price * b.quantity;
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
                SaleListComponent = __decorate([
                    core_1.Component({
                        selector: 'sale-list',
                        templateUrl: "/dist/templates/sale_list.template.html",
                        styleUrls: ['./css/sale_list.css'],
                        directives: [sale_modal_component_1.SaleModalComponent]
                    }), 
                    __metadata('design:paramtypes', [sale_service_1.SaleService, item_service_1.ItemService, router_deprecated_1.Router])
                ], SaleListComponent);
                return SaleListComponent;
            }());
            exports_1("SaleListComponent", SaleListComponent);
        }
    }
});
//# sourceMappingURL=sale_list.component.js.map