System.register(['@angular/core', './item_detail.component', './item.service', '@angular/router-deprecated'], function(exports_1, context_1) {
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
    var core_1, item_detail_component_1, item_service_1, router_deprecated_1;
    var ItemNewComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (item_detail_component_1_1) {
                item_detail_component_1 = item_detail_component_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            }],
        execute: function() {
            ItemNewComponent = (function () {
                function ItemNewComponent(_itemService, _router) {
                    this._itemService = _itemService;
                    this._router = _router;
                    var d = new Date();
                    this.day = d.getDate();
                    this.month = d.getMonth() + 1;
                    this.year = d.getFullYear();
                    this.salePrice = 0;
                    this.item = { id: null, name: "", price: null, salePrice: 0, quantity: 1, description: "", date: d };
                }
                ItemNewComponent.prototype.save = function () {
                    var _this = this;
                    var that = this;
                    this.item.date.setDate(this.day);
                    this.item.date.setMonth(this.month - 1);
                    this.item.date.setFullYear(this.year);
                    this._itemService.newItem(this.item).subscribe(function (res) {
                        if (!res.success) {
                            that.error = res.error;
                        }
                        else {
                            var link = ["ItemList"];
                            _this._router.navigate(link);
                        }
                    }, function (error) {
                        that.error = error;
                    });
                };
                ItemNewComponent.prototype.updatePrice = function (price) {
                    this.item.price = price * 100;
                };
                ItemNewComponent.prototype.updateSalePrice = function (price) {
                    this.item.salePrice = price * 100;
                };
                ItemNewComponent = __decorate([
                    core_1.Component({
                        selector: 'item-new',
                        templateUrl: 'dist/templates/item_new.template.html',
                        directives: [item_detail_component_1.ItemDetailComponent]
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, router_deprecated_1.Router])
                ], ItemNewComponent);
                return ItemNewComponent;
            }());
            exports_1("ItemNewComponent", ItemNewComponent);
        }
    }
});
//# sourceMappingURL=item_new.component.js.map