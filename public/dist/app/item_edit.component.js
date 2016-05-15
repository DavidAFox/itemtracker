System.register(['@angular/core', '@angular/router-deprecated', './item.service', './item_detail.component'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, item_service_1, item_detail_component_1;
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
            },
            function (item_detail_component_1_1) {
                item_detail_component_1 = item_detail_component_1_1;
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
                        this.getItem(id).subscribe(function (item) {
                            that.item = item;
                        }, function (error) { return that.error = error; });
                    }
                };
                ItemEditComponent.prototype.getItem = function (id) {
                    return this._itemService.getItem(id);
                };
                ItemEditComponent.prototype.save = function () {
                    var link = ["ItemList"];
                    this._router.navigate(link);
                };
                ItemEditComponent = __decorate([
                    core_1.Component({
                        selector: 'item-edit',
                        templateUrl: 'dist/templates/item_edit.template.html',
                        directives: [item_detail_component_1.ItemDetailComponent]
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