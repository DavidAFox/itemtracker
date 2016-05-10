System.register(['@angular/core', './item', './stolen', './stolen_detail.component'], function(exports_1, context_1) {
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
    var core_1, item_1, stolen_1, stolen_detail_component_1;
    var StolenModalComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (item_1_1) {
                item_1 = item_1_1;
            },
            function (stolen_1_1) {
                stolen_1 = stolen_1_1;
            },
            function (stolen_detail_component_1_1) {
                stolen_detail_component_1 = stolen_detail_component_1_1;
            }],
        execute: function() {
            StolenModalComponent = (function () {
                function StolenModalComponent() {
                    this.reload = new core_1.EventEmitter();
                }
                StolenModalComponent.prototype.close = function () {
                    $('#stolenModal').modal('hide');
                    this.reload.emit(this.stolen.id);
                    console.log("closed");
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', item_1.Item)
                ], StolenModalComponent.prototype, "item", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', stolen_1.Stolen)
                ], StolenModalComponent.prototype, "stolen", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], StolenModalComponent.prototype, "reload", void 0);
                StolenModalComponent = __decorate([
                    core_1.Component({
                        selector: 'stolen-modal',
                        templateUrl: 'dist/templates/stolen_modal.template.html',
                        directives: [stolen_detail_component_1.StolenDetailComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], StolenModalComponent);
                return StolenModalComponent;
            }());
            exports_1("StolenModalComponent", StolenModalComponent);
        }
    }
});
//# sourceMappingURL=stolen_modal.component.js.map