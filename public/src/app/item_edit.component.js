System.register(['angular2/core', 'angular2/router', './item.service', './item_detail.component'], function(exports_1, context_1) {
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
    var core_1, router_1, item_service_1, item_detail_component_1;
    var ItemEditComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
                    this.saved = { id: "not saved" };
                }
                ItemEditComponent.prototype.ngOnInit = function () {
                    var id = +this._routeParams.get('id');
                    var that = this;
                    if (isNaN(id)) {
                        var link = ['ItemList'];
                        that._router.navigate(link);
                    }
                    else {
                        this.getItem(id).subscribe(function (resp) {
                            if (resp.success) {
                                var item = resp.data;
                                that.item = item;
                                that.day = item.date.getDate();
                                that.month = item.date.getMonth() + 1;
                                that.year = item.date.getFullYear();
                                that.price = item.price / 100.0;
                                that.salePrice = item.salePrice / 100.0;
                            }
                            else {
                                that.error = resp.error;
                            }
                        }, function (error) { return that.error = error; });
                    }
                };
                ItemEditComponent.prototype.getItem = function (id) {
                    return this._itemService.getItem(id);
                };
                ItemEditComponent.prototype.save = function () {
                    var _this = this;
                    this.item.date.setDate(this.day);
                    this.item.date.setMonth(this.month - 1);
                    this.item.date.setFullYear(this.year);
                    //save item changes to database
                    this._itemService.updateItem(this.item).subscribe(function (res) {
                        if (!res.success) {
                            _this.error = res.error;
                        }
                        else {
                            var link = ["ItemList"];
                            _this._router.navigate(link);
                        }
                    }, function (error) { return _this.error = error; });
                };
                ItemEditComponent.prototype.updatePrice = function (price) {
                    this.item.price = price * 100;
                };
                ItemEditComponent.prototype.updateSalePrice = function (price) {
                    this.item.salePrice = price * 100;
                };
                ItemEditComponent = __decorate([
                    core_1.Component({
                        selector: 'item-edit',
                        template: "\n    <div class=\"container\">\n        <form>\n            <div class=\"form-group\"><label>Product #</label><input required class=\"form-control\" type=\"number\" [(ngModel)]=\"item.id\"/></div>\n            <div class=\"form-group\"><label>Name</label><input required class=\"form-control\" type=\"text\" [(ngModel)]=\"item.name\"/></div>\n            <div class=\"form-group\"><label>Description</label><textarea class=\"form-control\" [(ngModel)]=\"item.description\"></textarea></div>\n            <div class=\"form-group\"><label>Price</label><input required class=\"form-control\" type=\"number\" min=\"0\" [(ngModel)]=\"price\" (ngModelChange) = \"updatePrice(price)\"/></div>\n            <div class=\"form-group\"><label>Sale Price</label><input class=\"form-control\" type=\"number\" min=\"0\" [(ngModel)]=\"salePrice\" (ngModelChange) = \"updateSalePrice(salePrice)\"/></div>\n            <div class=\"form-group\"><label>Quantity</label><input required class=\"form-control\" type=\"number\" min=\"0\" [(ngModel)]=\"item.quantity\"/></div>\n            <div class=\"form-group\"><label>Date Added</label>\n                <label>M</label><input type=\"number\" min=\"1\" max=\"12\" [(ngModel)]=\"month\"/>\n                <label>D</label><input type=\"number\" min=\"1\" max=\"31\" [(ngModel)]=\"day\"/>\n                <label>Y</label><input type=\"number\" min=\"1900\" max=\"9999\" [(ngModel)]=\"year\"/>\n            </div>\n            <button (click)=\"save()\">Save</button>\n        </form>\n        <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n\n    </div>\n    ",
                        directives: [item_detail_component_1.ItemDetailComponent]
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, router_1.RouteParams, router_1.Router])
                ], ItemEditComponent);
                return ItemEditComponent;
            }());
            exports_1("ItemEditComponent", ItemEditComponent);
        }
    }
});
//# sourceMappingURL=item_edit.component.js.map