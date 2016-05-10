System.register(['@angular/core', './item', './sale', './sale_detail.component'], function(exports_1, context_1) {
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
    var core_1, item_1, sale_1, sale_detail_component_1;
    var SaleModalComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (item_1_1) {
                item_1 = item_1_1;
            },
            function (sale_1_1) {
                sale_1 = sale_1_1;
            },
            function (sale_detail_component_1_1) {
                sale_detail_component_1 = sale_detail_component_1_1;
            }],
        execute: function() {
            SaleModalComponent = (function () {
                function SaleModalComponent() {
                    this.reload = new core_1.EventEmitter();
                }
                SaleModalComponent.prototype.close = function () {
                    $('#saleModal').modal('hide');
                    this.reload.emit(this.sale.id);
                    console.log("closed");
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', item_1.Item)
                ], SaleModalComponent.prototype, "item", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', sale_1.Sale)
                ], SaleModalComponent.prototype, "sale", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], SaleModalComponent.prototype, "reload", void 0);
                SaleModalComponent = __decorate([
                    core_1.Component({
                        selector: 'sale-modal',
                        templateUrl: 'dist/templates/sale_modal.template.html',
                        directives: [sale_detail_component_1.SaleDetailComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SaleModalComponent);
                return SaleModalComponent;
            }());
            exports_1("SaleModalComponent", SaleModalComponent);
        }
    }
});
//# sourceMappingURL=sale_modal.component.js.map