System.register(['@angular/core', './sale.service', './sale', './item'], function(exports_1, context_1) {
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
    var core_1, sale_service_1, sale_1, item_1;
    var SaleDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (sale_service_1_1) {
                sale_service_1 = sale_service_1_1;
            },
            function (sale_1_1) {
                sale_1 = sale_1_1;
            },
            function (item_1_1) {
                item_1 = item_1_1;
            }],
        execute: function() {
            SaleDetailComponent = (function () {
                function SaleDetailComponent(_saleService) {
                    this._saleService = _saleService;
                    this.closer = new core_1.EventEmitter();
                    this.sale = new sale_1.Sale();
                }
                Object.defineProperty(SaleDetailComponent.prototype, "saleSet", {
                    set: function (sale) {
                        this.sale = sale;
                        this.day = this.sale.date.getDate();
                        this.month = this.sale.date.getMonth() + 1;
                        this.year = this.sale.date.getFullYear();
                        this.price = this.sale.price / 100;
                        this.fee = this.sale.fee / 100;
                    },
                    enumerable: true,
                    configurable: true
                });
                SaleDetailComponent.prototype.ngOnInit = function () {
                    var that = this;
                    that.day = that.sale.date.getDate();
                    that.month = that.sale.date.getMonth() + 1;
                    that.year = that.sale.date.getFullYear();
                    that.price = that.sale.price / 100;
                    that.fee = that.sale.fee / 100;
                };
                SaleDetailComponent.prototype.save = function () {
                    var that = this;
                    this.sale.date.setDate(this.day);
                    this.sale.date.setMonth(this.month - 1);
                    this.sale.date.setFullYear(this.year);
                    this._saleService.updateSale(this.sale).subscribe(function (resp) {
                        if (resp.success) {
                            that.close();
                        }
                        else {
                            that.error = resp.error;
                        }
                    }, function (error) { return that.error = error; });
                };
                SaleDetailComponent.prototype.updatePrice = function (price) {
                    this.sale.price = price * 100;
                };
                SaleDetailComponent.prototype.updateFee = function (fee) {
                    this.sale.fee = fee * 100;
                };
                SaleDetailComponent.prototype.close = function () {
                    this.closer.emit(true);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', sale_1.Sale), 
                    __metadata('design:paramtypes', [sale_1.Sale])
                ], SaleDetailComponent.prototype, "saleSet", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', item_1.Item)
                ], SaleDetailComponent.prototype, "item", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], SaleDetailComponent.prototype, "closer", void 0);
                SaleDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'sale-detail',
                        template: "\n        <h3>{{item.name}} #{{item.id}}</h3>\n        <p>{{item.description}}</p>\n        <form (ngSubmit)=\"save()\" #saleForm=\"ngForm\">\n        <div class=\"form-group\"><label>Handling Fee</label><input ngControl=\"feeControl\" class=\"form-control\" type=\"number\" min=\"0\" step=\".01\" [(ngModel)]=\"fee\" (ngModelChange)=\"updateFee(fee)\"/></div>\n        <div class=\"form-group\"><label>Quantity Sold</label><input ngControl=\"quantityControl\" required class=\"form-control\" type=\"number\" min=\"0\" [(ngModel)]=\"sale.quantity\"/></div>\n        <div class=\"form-group\"><label>Sales Tax Rate</label><input ngControl=\"sTaxRateControl\" required class=\"form-control\" type=\"number\" min=\"0\" step=\".0001\" [(ngModel)]=\"sale.sTaxRate\"/></div>\n        <div class=\"form-group\"><label>Price</label><input ngControl=\"priceControl\" required class=\"form-control\" type=\"number\" min=\"0\" step=\".01\" [(ngModel)]=\"price\" (ngModelChange) = \"updatePrice(price)\"/></div>\n        <div class=\"form-group\"><label>Date</label><br>\n            <label>M</label><input ngControl=\"monthControl\" type=\"number\" min=\"1\" max=\"12\" [(ngModel)]=\"month\"/>\n            <label>D</label><input ngControl=\"dayControl\" type=\"number\" min=\"1\" max=\"31\" [(ngModel)]=\"day\"/>\n            <label>Y</label><input ngControl=\"yearControl\" type=\"number\" min=\"1900\" max=\"9999\" [(ngModel)]=\"year\"/>\n        </div>\n        <div class=\"form-group\"><label>Where</label><input ngControl=\"whereControl\" class=\"form-control\" type=\"text\" [(ngModel)]=\"sale.where\"/></div>\n        <div class=\"form-group\"><label>Comment</label><textarea ngControl=\"commentControl\" class= \"form-control\" rows=\"5\" cols=\"30\" [(ngModel)]=\"sale.comment\"></textarea></div>\n        <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"!saleForm.form.valid\">Save</button>\n        </form>\n        <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n    "
                    }), 
                    __metadata('design:paramtypes', [sale_service_1.SaleService])
                ], SaleDetailComponent);
                return SaleDetailComponent;
            }());
            exports_1("SaleDetailComponent", SaleDetailComponent);
        }
    }
});
//# sourceMappingURL=sale_detail.component.js.map