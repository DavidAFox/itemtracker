System.register(['@angular/core', './item.service', '@angular/router-deprecated', './item', './item_modal.component', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, item_service_1, router_deprecated_1, item_1, item_modal_component_1;
    var ItemListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (item_1_1) {
                item_1 = item_1_1;
            },
            function (item_modal_component_1_1) {
                item_modal_component_1 = item_modal_component_1_1;
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
                    this.showModal = false;
                    this.selectedItem = new item_1.Item();
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
                    this.selectedItem = item_1.Item.copy(item);
                    $('#itemModal').modal('show');
                    //        var link = ['ItemEdit', {id: item.id}];
                    //        this._router.navigate(link);
                };
                ItemListComponent.prototype.reload = function (id) {
                    var that = this;
                    this.items.forEach(function (item, index) {
                        if (item.id === id) {
                            that._itemService.getItem(id).subscribe(function (resp) {
                                if (resp.success) {
                                    that.items[index] = resp.data;
                                }
                                else {
                                    that.error = resp.error;
                                }
                            }, function (error) { return that.error = error; });
                        }
                    });
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
                        templateUrl: "dist/templates/item_list.template.html",
                        styleUrls: ['./css/item_list.css'],
                        directives: [item_modal_component_1.ItemModalComponent]
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, router_deprecated_1.Router])
                ], ItemListComponent);
                return ItemListComponent;
            }());
            exports_1("ItemListComponent", ItemListComponent);
        }
    }
});
//# sourceMappingURL=item_list.component.js.map