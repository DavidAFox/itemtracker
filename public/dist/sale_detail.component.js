System.register(['angular2/core', './sale', './item'], function(exports_1, context_1) {
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
    var core_1, sale_1, item_1;
    var SaleDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (sale_1_1) {
                sale_1 = sale_1_1;
            },
            function (item_1_1) {
                item_1 = item_1_1;
            }],
        execute: function() {
            SaleDetailComponent = (function () {
                function SaleDetailComponent() {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', sale_1.Sale)
                ], SaleDetailComponent.prototype, "sale", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', item_1.Item)
                ], SaleDetailComponent.prototype, "item", void 0);
                SaleDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'sale-detail',
                        template: "\n        <h3>{{item.name}} #{{item.id}}</h3>\n        <p>{{item.description}}</p>\n        <table>\n        <tr><td><label>Handling Fee</label></td><td><input type=\"number\" min=\"0\"[(ngModel)]=\"sale.fee\"/></td></tr>\n        <tr><td><label>Quantity Sold</label></td><td><input type=\"number\" min=\"0\" [(ngModel)]=\"sale.quantity\"/></td></tr>\n        <tr><td><label>Sales Tax Rate</label></td><td><input type=\"number\" min=\"0\" [(ngModel)]=\"sale.sTaxRate\"/></td></tr>\n        <tr><td><label>Price</label></td><td><input type=\"number\" min=\"0\"[(ngModel)]=\"sale.price\"/></td></tr>\n        <tr><td><label>Date</label></td><td>\n            <label>M</label><input type=\"number\" min=\"1\" max=\"12\" [(ngModel)]=\"item.month\"/>\n            <label>D</label><input type=\"number\" min=\"1\" max=\"31\" [(ngModel)]=\"item.day\"/>\n            <label>Y</label><input type=\"number\" min=\"1900\" max=\"9999\" [(ngModel)]=\"item.year\"/>\n        </td></tr>\n        <tr><td><label>Where</label></td><td><input type=\"text\" [(ngModel)]=\"sale.where\"/></td></tr>\n        <tr><td><label>Comment</label></td><td><textarea rows=\"5\" cols=\"30\"></textarea></td></tr>\n        </table>    \n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], SaleDetailComponent);
                return SaleDetailComponent;
            }());
            exports_1("SaleDetailComponent", SaleDetailComponent);
        }
    }
});
//# sourceMappingURL=sale_detail.component.js.map