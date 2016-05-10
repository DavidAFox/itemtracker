System.register(['@angular/core', '@angular/router-deprecated', './item.service'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, item_service_1;
    var ItemRemoveComponent;
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
            }],
        execute: function() {
            ItemRemoveComponent = (function () {
                function ItemRemoveComponent(_itemService, _routeParams, _router) {
                    this._itemService = _itemService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.item = {};
                    this.quantity = 0;
                }
                ItemRemoveComponent.prototype.ngOnInit = function () {
                    var that = this;
                    var id = +this._routeParams.get('id');
                    if (isNaN(id)) {
                        var link = ['ItemList'];
                        this._router.navigate(link);
                    }
                    else {
                    }
                };
                ItemRemoveComponent.prototype.save = function () {
                };
                ItemRemoveComponent = __decorate([
                    core_1.Component({
                        selector: 'item-remove',
                        template: "\n    <div class=\"container\">\n        <h3>{{item.name}} #{{item.id}}</h3>\n        <form>\n        <div class=\"form-group\"><label>Quantity</label><input class=\"form-control\" type=\"number\" min=\"0\" [(ngModel)]=\"quantity\"/></div>\n        <button (click)=\"save()\">Save</button>\n        </form>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, router_deprecated_1.RouteParams, router_deprecated_1.Router])
                ], ItemRemoveComponent);
                return ItemRemoveComponent;
            }());
            exports_1("ItemRemoveComponent", ItemRemoveComponent);
        }
    }
});
//# sourceMappingURL=item_remove.component.js.map