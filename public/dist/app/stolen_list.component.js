System.register(['@angular/core', './stolen.service', './item.service', '@angular/router-deprecated', './stolen', './item', './stolen_modal.component'], function(exports_1, context_1) {
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
    var core_1, stolen_service_1, item_service_1, router_deprecated_1, stolen_1, item_1, stolen_modal_component_1;
    var StolenListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (stolen_service_1_1) {
                stolen_service_1 = stolen_service_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (stolen_1_1) {
                stolen_1 = stolen_1_1;
            },
            function (item_1_1) {
                item_1 = item_1_1;
            },
            function (stolen_modal_component_1_1) {
                stolen_modal_component_1 = stolen_modal_component_1_1;
            }],
        execute: function() {
            StolenListComponent = (function () {
                function StolenListComponent(_stolenService, _itemService, _router) {
                    this._stolenService = _stolenService;
                    this._itemService = _itemService;
                    this._router = _router;
                    this.stolens = [];
                    this.itemNames = {};
                    this.items = {};
                    this.sort = '';
                    this.reversed = false;
                    this.datesSelected = false;
                    this.selectedStolen = new stolen_1.Stolen();
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
                StolenListComponent.prototype.ngOnInit = function () {
                    this.getStolens();
                };
                StolenListComponent.prototype.getStolens = function () {
                    var that = this;
                    this._stolenService.getStolens().subscribe(function (data) {
                        that.stolens = data;
                        that.stolens.forEach(function (stolen) {
                            that._itemService.getItem(stolen.itemId).subscribe(function (item) {
                                that.itemNames[stolen.itemId] = item.name;
                                that.items[stolen.id] = item;
                            }, function (error) { return that.error = error; });
                        });
                    }, function (error) { return that.error = error; });
                    this.sort = '';
                    this.reversed = false;
                };
                StolenListComponent.prototype.getStolensWithDates = function (starting, ending) {
                    var that = this;
                    this._stolenService.getStolens(starting, ending).subscribe(function (data) {
                        that.stolens = data;
                        that.stolens.forEach(function (stolen) {
                            that._itemService.getItem(stolen.itemId).subscribe(function (item) {
                                that.itemNames[stolen.itemId] = item.name;
                                that.items[stolen.id] = item;
                            }, function (error) { return that.error = error; });
                        });
                    }, function (error) { return that.error = error; });
                    this.sort = '';
                    this.reversed = false;
                };
                StolenListComponent.prototype.updateDates = function () {
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
                        this.getStolensWithDates(this.startDate, this.endDate);
                    }
                    else {
                        this.getStolens();
                    }
                };
                StolenListComponent.prototype.updateStolens = function () {
                    if (this.datesSelected) {
                        this.getStolensWithDates(this.startDate, this.endDate);
                    }
                    else {
                        this.getStolens();
                    }
                };
                StolenListComponent.prototype.total = function (stolens) {
                    return stolens.reduce(function (total, stolen) {
                        return total + (stolen.price * stolen.quantity);
                    }, 0);
                };
                StolenListComponent.prototype.edit = function (stolen) {
                    //        var link = ['StolenEdit', {id: stolen.id}];
                    //        this._router.navigate(link);
                    this.selectedStolen = stolen_1.Stolen.copy(stolen);
                    this.selectedItem = item_1.Item.copy(this.items[stolen.id]);
                    $('#stolenModal').modal('show');
                };
                StolenListComponent.prototype.reload = function (id) {
                    var that = this;
                    that.stolens.forEach(function (stolen, index) {
                        if (stolen.id === id) {
                            that._stolenService.getStolen(id).subscribe(function (stolen) {
                                that.stolens[index] = stolen;
                            }, function (error) { return that.error = error; });
                        }
                    });
                };
                StolenListComponent.prototype.sortBy = function (type) {
                    if (this.sort === type) {
                        this.reversed = !this.reversed;
                    }
                    else {
                        this.reversed = false;
                    }
                    var that = this;
                    this.stolens.sort(function (a, b) {
                        var x = 1;
                        var y;
                        var z;
                        if (a[type] && b[type] && a[type].toLowerCase && b[type].toLowerCase) {
                            y = a[type].toLowerCase;
                            z = b[type].toLowerCase;
                        }
                        else if (type === 'name') {
                            y = that.itemNames[a['itemId']].toLowerCase();
                            z = that.itemNames[b['itemId']].toLowerCase();
                        }
                        else if (type === 'totalStolen') {
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
                    that.sort = type;
                };
                StolenListComponent = __decorate([
                    core_1.Component({
                        selector: 'stolen-list',
                        templateUrl: '/dist/templates/stolen_list.template.html',
                        directives: [stolen_modal_component_1.StolenModalComponent]
                    }), 
                    __metadata('design:paramtypes', [stolen_service_1.StolenService, item_service_1.ItemService, router_deprecated_1.Router])
                ], StolenListComponent);
                return StolenListComponent;
            }());
            exports_1("StolenListComponent", StolenListComponent);
        }
    }
});
//# sourceMappingURL=stolen_list.component.js.map