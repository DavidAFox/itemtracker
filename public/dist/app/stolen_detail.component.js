System.register(['@angular/core', './stolen', './item', './stolen.service'], function(exports_1, context_1) {
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
    var core_1, stolen_1, item_1, stolen_service_1;
    var StolenDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (stolen_1_1) {
                stolen_1 = stolen_1_1;
            },
            function (item_1_1) {
                item_1 = item_1_1;
            },
            function (stolen_service_1_1) {
                stolen_service_1 = stolen_service_1_1;
            }],
        execute: function() {
            StolenDetailComponent = (function () {
                function StolenDetailComponent(_stolenService) {
                    this._stolenService = _stolenService;
                    this.closer = new core_1.EventEmitter();
                    this.stolen = new stolen_1.Stolen();
                }
                Object.defineProperty(StolenDetailComponent.prototype, "stolenSet", {
                    set: function (stolen) {
                        this.stolen = stolen;
                        this.day = this.stolen.date.getDate();
                        this.month = this.stolen.date.getMonth() + 1;
                        this.year = this.stolen.date.getFullYear();
                        this.price = this.stolen.price / 100;
                    },
                    enumerable: true,
                    configurable: true
                });
                StolenDetailComponent.prototype.ngOnInit = function () {
                    var that = this;
                    that.day = that.stolen.date.getDate();
                    that.month = that.stolen.date.getMonth() + 1;
                    that.year = that.stolen.date.getFullYear();
                    that.price = that.stolen.price / 100;
                };
                StolenDetailComponent.prototype.save = function () {
                    var that = this;
                    this.stolen.date.setDate(this.day);
                    this.stolen.date.setMonth(this.month - 1);
                    this.stolen.date.setFullYear(this.year);
                    this._stolenService.updateStolen(this.stolen).subscribe(function (resp) {
                        that.close();
                    }, function (error) { return that.error = error; });
                };
                StolenDetailComponent.prototype.updatePrice = function (price) {
                    this.stolen.price = price * 100;
                };
                StolenDetailComponent.prototype.close = function () {
                    this.closer.emit(true);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', stolen_1.Stolen), 
                    __metadata('design:paramtypes', [stolen_1.Stolen])
                ], StolenDetailComponent.prototype, "stolenSet", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', item_1.Item)
                ], StolenDetailComponent.prototype, "item", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], StolenDetailComponent.prototype, "closer", void 0);
                StolenDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'stolen-detail',
                        templateUrl: 'dist/templates/stolen_detail.template.html'
                    }), 
                    __metadata('design:paramtypes', [stolen_service_1.StolenService])
                ], StolenDetailComponent);
                return StolenDetailComponent;
            }());
            exports_1("StolenDetailComponent", StolenDetailComponent);
        }
    }
});
//# sourceMappingURL=stolen_detail.component.js.map