System.register(['@angular/core', './item', './item.service'], function(exports_1, context_1) {
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
    var core_1, item_1, item_service_1;
    var ItemDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (item_1_1) {
                item_1 = item_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            }],
        execute: function() {
            ItemDetailComponent = (function () {
                function ItemDetailComponent(_itemService) {
                    this._itemService = _itemService;
                    this.closer = new core_1.EventEmitter();
                }
                Object.defineProperty(ItemDetailComponent.prototype, "itemSet", {
                    set: function (item) {
                        this.item = item;
                        this.price = item.price / 100;
                        this.salePrice = item.salePrice / 100;
                        this.day = this.item.date.getDate();
                        this.month = this.item.date.getMonth() + 1;
                        this.year = this.item.date.getFullYear();
                    },
                    enumerable: true,
                    configurable: true
                });
                ItemDetailComponent.prototype.ngOnInit = function () {
                    var that = this;
                    that.day = that.item.date.getDate();
                    that.month = that.item.date.getMonth() + 1;
                    that.year = that.item.date.getFullYear();
                    that.price = that.item.price / 100.0;
                    that.salePrice = that.item.salePrice / 100.0;
                };
                ItemDetailComponent.prototype.save = function () {
                    var _this = this;
                    this.item.date.setDate(this.day);
                    this.item.date.setMonth(this.month - 1);
                    this.item.date.setFullYear(this.year);
                    //save item changes to database
                    this._itemService.updateItem(this.item).subscribe(function (res) {
                        _this.error = "";
                        _this.close();
                    }, function (error) { return _this.error = error; });
                };
                ItemDetailComponent.prototype.close = function () {
                    this.closer.emit(true);
                };
                ItemDetailComponent.prototype.updatePrice = function (price) {
                    this.item.price = price * 100;
                };
                ItemDetailComponent.prototype.updateSalePrice = function (price) {
                    this.item.salePrice = price * 100;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', item_1.Item), 
                    __metadata('design:paramtypes', [item_1.Item])
                ], ItemDetailComponent.prototype, "itemSet", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], ItemDetailComponent.prototype, "closer", void 0);
                ItemDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'item-detail',
                        templateUrl: "dist/templates/item_detail.template.html"
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService])
                ], ItemDetailComponent);
                return ItemDetailComponent;
            }());
            exports_1("ItemDetailComponent", ItemDetailComponent);
        }
    }
});
//# sourceMappingURL=item_detail.component.js.map