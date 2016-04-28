System.register(['angular2/core', 'angular2/router', './item.service', './stolen.service'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, item_service_1, stolen_service_1;
    var StolenComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            },
            function (stolen_service_1_1) {
                stolen_service_1 = stolen_service_1_1;
            }],
        execute: function() {
            StolenComponent = (function () {
                function StolenComponent(_itemService, _stolenService, _routeParams, _router) {
                    this._itemService = _itemService;
                    this._stolenService = _stolenService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.item = {};
                    this.stolen = { id: 0, quantity: 0, itemId: 0, date: new Date(), price: 0 };
                }
                StolenComponent.prototype.ngOnInit = function () {
                    var id = +this._routeParams.get('id');
                    var that = this;
                    if (isNaN(id)) {
                        var link = ['ItemList'];
                        that._router.navigate(link);
                    }
                    else {
                        that._itemService.getItem(id).subscribe(function (resp) {
                            if (resp.success) {
                                var item = resp.data;
                                var d = new Date();
                                that.day = d.getDate();
                                that.month = d.getMonth() + 1;
                                that.year = d.getFullYear();
                                that.item = item;
                                that.price = item.price / 100;
                                that.stolen = { id: 0, quantity: item.quantity, itemId: item.id, date: d, price: item.price };
                            }
                            else {
                                that.error = resp.error;
                            }
                        }, function (error) { return that.error = error; });
                    }
                };
                StolenComponent.prototype.save = function () {
                    this.stolen.date.setDate(this.day);
                    this.stolen.date.setMonth(this.month - 1);
                    this.stolen.date.setFullYear(this.year);
                    var that = this;
                    this._stolenService.newStolen(that.stolen).subscribe(function (resp) {
                        var link = ['ItemList'];
                        that._router.navigate(link);
                    }, function (error) { return that.error = error; });
                };
                StolenComponent.prototype.updatePrice = function () {
                    this.stolen.price = this.price * 100;
                };
                StolenComponent = __decorate([
                    core_1.Component({
                        selector: 'stolen',
                        template: "\n        <div class=\"container\">\n        <h3>{{item.name}} #{{item.id}}</h3>\n            <form>\n            <div class=\"form-group\"><label>Quantity</label><input class=\"form-control\" type=\"number\" min=\"0\"[(ngModel)]=\"stolen.quantity\"/></div>\n            <div class=\"form-group\"><label>Date</label>\n                <label>M</label><input type=\"number\" min=\"1\" max=\"12\" [(ngModel)]=\"month\"/>\n                -<label>D</label><input type=\"number\" min=\"1\" max=\"31\" [(ngModel)]=\"day\"/>\n                -<label>Y</label><input type=\"number\" min=\"1900\" [(ngModel)]=\"year\"/>\n            </div>\n            <div class=\"form-group\"><label>Price</label><input class=\"form-control\" type=\"number\" min=\"0\" [(ngModel)]=\"price\" (ngModelChange) = \"updatePrice(price)\"/></div>\n            <button (click)=\"save()\">Save</button>\n        </form>\n        <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, stolen_service_1.StolenService, router_1.RouteParams, router_2.Router])
                ], StolenComponent);
                return StolenComponent;
            }());
            exports_1("StolenComponent", StolenComponent);
        }
    }
});
//# sourceMappingURL=stolen.component.js.map