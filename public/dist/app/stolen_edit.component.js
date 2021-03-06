System.register(['@angular/core', './item.service', './stolen.service', '@angular/router-deprecated', './stolen_detail.component'], function(exports_1, context_1) {
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
    var core_1, item_service_1, stolen_service_1, router_deprecated_1, stolen_detail_component_1;
    var StolenEditComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            },
            function (stolen_service_1_1) {
                stolen_service_1 = stolen_service_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (stolen_detail_component_1_1) {
                stolen_detail_component_1 = stolen_detail_component_1_1;
            }],
        execute: function() {
            StolenEditComponent = (function () {
                function StolenEditComponent(_itemService, _stolenService, _router, _routeParams) {
                    this._itemService = _itemService;
                    this._stolenService = _stolenService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.item = {};
                    this.stolen = { id: 0, quantity: 0, itemId: 0, date: new Date(), price: 0 };
                }
                StolenEditComponent.prototype.ngOnInit = function () {
                    var id = +this._routeParams.get('id');
                    var that = this;
                    if (isNaN(id)) {
                        var link = ['StolenList'];
                        that._router.navigate(link);
                    }
                    else {
                        that._stolenService.getStolen(id).subscribe(function (data) {
                            that.stolen = data;
                            that._itemService.getItem(that.stolen.itemId).subscribe(function (item) {
                                that.item = item;
                            }, function (error) { return that.error = error; });
                        }, function (error) { return that.error = error; });
                    }
                };
                StolenEditComponent.prototype.save = function () {
                    var that = this;
                    var link = ['StolenList'];
                    that._router.navigate(link);
                };
                StolenEditComponent = __decorate([
                    core_1.Component({
                        selector: 'stolen-edit',
                        templateUrl: "/dist/templates/stolen_edit.template.html",
                        directives: [stolen_detail_component_1.StolenDetailComponent]
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, stolen_service_1.StolenService, router_deprecated_1.Router, router_deprecated_1.RouteParams])
                ], StolenEditComponent);
                return StolenEditComponent;
            }());
            exports_1("StolenEditComponent", StolenEditComponent);
        }
    }
});
//# sourceMappingURL=stolen_edit.component.js.map