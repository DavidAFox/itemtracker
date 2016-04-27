System.register(['angular2/core', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, router_1;
    var NavBarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            NavBarComponent = (function () {
                function NavBarComponent(_router) {
                    this._router = _router;
                }
                NavBarComponent = __decorate([
                    core_1.Component({
                        selector: 'nav-bar',
                        template: "\n    <nav class=\"navbar navbar-default navbar-fixed-top\" id=\"dnav\">\n  <div class=\"container-fluid\">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" [routerLink]=\"['ItemList']\">Item Tracker</a>\n    </div>\n\n    <!-- Collect the nav links, forms, and other content for toggling -->\n    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n      <ul class=\"nav navbar-nav\">\n        <li [class.active]=\"_router.isRouteActive(_router.generate(['ItemList']))\"><a [routerLink]=\"['ItemList']\">Item List <span class=\"sr-only\">(current)</span></a></li>\n        <li [class.active]=\"_router.isRouteActive(_router.generate(['SaleList']))\"><a [routerLink]=\"['SaleList']\">Sales List</a></li>\n        <li [class.active]=\"_router.isRouteActive(_router.generate(['StolenList']))\"><a [routerLink]=\"['StolenList']\">Stolen List</a></li>\n        <li [class.active]=\"_router.isRouteActive(_router.generate(['SalesTax']))\"><a [routerLink]=\"['SalesTax']\">Sales Tax</a></li>\n      </ul>\n      <ul class=\"nav navbar-nav navbar-right\">\n            <li><a href=\"logout.php\">Logout</a></li>\n      </ul>\n    </div><!-- /.navbar-collapse -->\n  </div><!-- /.container-fluid -->\n</nav>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        styleUrls: ['./css/nav.css']
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], NavBarComponent);
                return NavBarComponent;
            }());
            exports_1("NavBarComponent", NavBarComponent);
        }
    }
});
//# sourceMappingURL=nav-bar.component.js.map