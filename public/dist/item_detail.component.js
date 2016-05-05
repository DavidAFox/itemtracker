System.register(['angular2/core', './item'], function(exports_1, context_1) {
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
    var core_1, item_1;
    var ItemDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (item_1_1) {
                item_1 = item_1_1;
            }],
        execute: function() {
            ItemDetailComponent = (function () {
                function ItemDetailComponent() {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', item_1.Item)
                ], ItemDetailComponent.prototype, "item", void 0);
                ItemDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'item-detail',
                        template: "\n        <table>\n            <tr><td><label>Product #</label></td><td><input type=\"number\" [(ngModel)]=\"item.id\"/></td></tr>\n            <tr><td><label>Name</label></td><td><input type=\"text\" [(ngModel)]=\"item.name\"/></td></tr>\n            <tr><td><label>Description</label></td><td><textarea [(ngModel)]=\"item.description\"></textarea></td></tr>\n            <tr><td><label>Price</label></td><td><input type=\"number\" min=\"0\" [(ngModel)]=\"item.price\"/></td></tr>\n            <tr><td><label>Sale Price</label></td><td><input type=\"number\" min=\"0\" [(ngModel)]=\"item.salePrice\"/></td></tr>\n            <tr><td><label>Quantity</label></td><td><input type=\"number\" min=\"0\" [(ngModel)]=\"item.quantity\"/></td></tr>\n            <tr><td><label>Date Added</label></td><td>\n                <label>M</label><input type=\"number\" min=\"1\" max=\"12\" [(ngModel)]=\"item.month\"/>\n                <label>D</label><input type=\"number\" min=\"1\" max=\"31\" [(ngModel)]=\"item.day\"/>\n                <label>Y</label><input type=\"number\" min=\"1900\" max=\"9999\" [(ngModel)]=\"item.year\"/>\n            </td></tr>\n       </table>    \n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ItemDetailComponent);
                return ItemDetailComponent;
            }());
            exports_1("ItemDetailComponent", ItemDetailComponent);
        }
    }
});
//# sourceMappingURL=item_detail.component.js.map