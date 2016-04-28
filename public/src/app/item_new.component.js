System.register(['angular2/core', './item_detail.component', './item.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, item_detail_component_1, item_service_1, router_1;
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
            function (router_1_1) {
                router_1 = router_1_1;
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
                        template: "\n    <div class=\"container\">\n        <form (ngSubmit)=\"save()\" #itemForm=\"ngForm\">\n            <div class=\"form-group\"><label>Product #</label><input ngControl=\"idControl\" required class=\"form-control\" type=\"number\" [(ngModel)]=\"item.id\"/></div>\n            <div class=\"form-group\"><label>Name</label><input required ngControl=\"nameControl\" class=\"form-control\" type=\"text\" [(ngModel)]=\"item.name\"/></div>\n            <div class=\"form-group\"><label>Description</label><textarea ngControl=\"descriptionControl\" class=\"form-control\" [(ngModel)]=\"item.description\"></textarea></div>\n            <div class=\"form-group\"><label>Price</label><input required ngControl=\"priceControl\" class=\"form-control\" type=\"number\" min=\"0\" step=\".01\" [(ngModel)]=\"price\" (ngModelChange) = \"updatePrice(price)\"/></div>\n            <div class=\"form-group\"><label>Sale Price</label><input ngControl=\"salePriceControl\" class=\"form-control\" type=\"number\" min=\"0\" step=\".01\" [(ngModel)] = \"salePrice\" (ngModelChange)=\"updateSalePrice(salePrice)\"/></div>\n            <div class=\"form-group\"><label>Quantity</label><input required ngControl=\"quantityControl\" class=\"form-control\" type=\"number\" min=\"0\" [(ngModel)]=\"item.quantity\"/></div>\n            <div class=\"form-group\"><label>Date Added</label>\n                <label>M</label><input ngControl=\"monthControl\" type=\"number\" min=\"1\" max=\"12\" [(ngModel)]=\"month\"/>\n                <label>D</label><input ngControl=\"dayControl\" type=\"number\" min=\"1\" max=\"31\" [(ngModel)]=\"day\"/>\n                <label>Y</label><input ngControl=\"yearControl\" type=\"number\" min=\"1900\" max=\"9999\" [(ngModel)]=\"year\"/>\n            </div>\n            <button class=\"btn btn-default\" type=\"submit\" [disabled]=\"!itemForm.form.valid\">Save</button>\n        </form>\n        <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n    </div>\n    ",
                        directives: [item_detail_component_1.ItemDetailComponent]
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, router_1.Router])
                ], ItemNewComponent);
                return ItemNewComponent;
            }());
            exports_1("ItemNewComponent", ItemNewComponent);
        }
    }
});
//# sourceMappingURL=item_new.component.js.map