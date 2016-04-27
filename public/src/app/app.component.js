System.register(['angular2/core', 'angular2/router', './item_list.component', './sold.component', './item.service', './stolen.component', './item_edit.component', './item_new.component', './item_remove.component', './sale_list.component', './sale.service', './sale_edit.component', './nav-bar.component', 'angular2/http', './stolen_list.component', './stolen.service', './stolen_edit.component', './sales_tax.component'], function(exports_1, context_1) {
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
    var core_1, router_1, item_list_component_1, sold_component_1, item_service_1, stolen_component_1, item_edit_component_1, item_new_component_1, item_remove_component_1, sale_list_component_1, sale_service_1, sale_edit_component_1, nav_bar_component_1, http_1, stolen_list_component_1, stolen_service_1, stolen_edit_component_1, sales_tax_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (item_list_component_1_1) {
                item_list_component_1 = item_list_component_1_1;
            },
            function (sold_component_1_1) {
                sold_component_1 = sold_component_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            },
            function (stolen_component_1_1) {
                stolen_component_1 = stolen_component_1_1;
            },
            function (item_edit_component_1_1) {
                item_edit_component_1 = item_edit_component_1_1;
            },
            function (item_new_component_1_1) {
                item_new_component_1 = item_new_component_1_1;
            },
            function (item_remove_component_1_1) {
                item_remove_component_1 = item_remove_component_1_1;
            },
            function (sale_list_component_1_1) {
                sale_list_component_1 = sale_list_component_1_1;
            },
            function (sale_service_1_1) {
                sale_service_1 = sale_service_1_1;
            },
            function (sale_edit_component_1_1) {
                sale_edit_component_1 = sale_edit_component_1_1;
            },
            function (nav_bar_component_1_1) {
                nav_bar_component_1 = nav_bar_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (stolen_list_component_1_1) {
                stolen_list_component_1 = stolen_list_component_1_1;
            },
            function (stolen_service_1_1) {
                stolen_service_1 = stolen_service_1_1;
            },
            function (stolen_edit_component_1_1) {
                stolen_edit_component_1 = stolen_edit_component_1_1;
            },
            function (sales_tax_component_1_1) {
                sales_tax_component_1 = sales_tax_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n\t\t<nav-bar></nav-bar>\n\t\t<br>\n\t\t<br>\n\t\t<br>\n\t\t<router-outlet></router-outlet>\n\t",
                        directives: [router_1.ROUTER_DIRECTIVES, nav_bar_component_1.NavBarComponent],
                        providers: [item_service_1.ItemService, sale_service_1.SaleService, stolen_service_1.StolenService, http_1.HTTP_PROVIDERS]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/itemlist',
                            name: 'ItemList',
                            component: item_list_component_1.ItemListComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/sold/:id',
                            name: 'Sold',
                            component: sold_component_1.SoldComponent
                        },
                        {
                            path: '/stolen/:id',
                            name: 'Stolen',
                            component: stolen_component_1.StolenComponent
                        },
                        {
                            path: '/item/:id',
                            name: 'ItemEdit',
                            component: item_edit_component_1.ItemEditComponent
                        },
                        {
                            path: '/item',
                            name: 'ItemNew',
                            component: item_new_component_1.ItemNewComponent
                        },
                        {
                            path: '/remove/:id',
                            name: 'ItemRemove',
                            component: item_remove_component_1.ItemRemoveComponent
                        },
                        {
                            path: '/salelist',
                            name: 'SaleList',
                            component: sale_list_component_1.SaleListComponent
                        },
                        {
                            path: '/sale/:id',
                            name: 'SaleEdit',
                            component: sale_edit_component_1.SaleEditComponent
                        },
                        {
                            path: '/stolenlist',
                            name: 'StolenList',
                            component: stolen_list_component_1.StolenListComponent
                        },
                        {
                            path: '/stolen/edit/:id',
                            name: 'StolenEdit',
                            component: stolen_edit_component_1.StolenEditComponent
                        },
                        {
                            path: '/salestax',
                            name: 'SalesTax',
                            component: sales_tax_component_1.SalesTaxComponent
                        },
                        {
                            path: '/**',
                            component: item_list_component_1.ItemListComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map