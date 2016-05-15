System.register(['@angular/core', 'rxjs/Observable', '@angular/http', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, Observable_1, http_1, http_2;
    var SaleService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            SaleService = (function () {
                function SaleService(http) {
                    this.http = http;
                    this.apiUrl = "/api/sales/";
                }
                SaleService.prototype.getSales = function (starting, ending) {
                    if (starting && ending) {
                        var params = new http_2.URLSearchParams();
                        params.set('starting', starting.toISOString());
                        params.set('ending', ending.toISOString());
                        var options = new http_2.RequestOptions({ search: params });
                        return this.http.get(this.apiUrl + 'list', options).map(this.extractData).catch(this.handleError);
                    }
                    return this.http.get(this.apiUrl + 'list').map(this.extractData).catch(this.handleError);
                };
                SaleService.prototype.getSale = function (id) {
                    return this.http.get(this.apiUrl + id).map(this.extractData).catch(this.handleError);
                };
                SaleService.prototype.updateSale = function (sale) {
                    var body = JSON.stringify(sale);
                    console.log(body);
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this.http.post(this.apiUrl + "update", body, options).map(this.extractData).catch(this.handleError);
                };
                SaleService.prototype.newSale = function (sale) {
                    var body = JSON.stringify(sale);
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this.http.post(this.apiUrl + "new", body, options).map(this.extractData).catch(this.handleError);
                };
                SaleService.prototype.extractData = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Bad response status: ' + res.status);
                    }
                    var body = res.json();
                    if (!body.success) {
                        throw new Error(body.error);
                    }
                    if (body.data) {
                        if (body.data.forEach) {
                            body.data.forEach(function (sale) {
                                sale.date = new Date(sale.date);
                            });
                        }
                        else {
                            if (body.data.date) {
                                body.data.date = new Date(body.data.date);
                            }
                        }
                    }
                    return body.data || {};
                };
                SaleService.prototype.handleError = function (error) {
                    var errMsg = error.message || 'Server error';
                    console.error(errMsg);
                    return Observable_1.Observable.throw(errMsg);
                };
                SaleService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], SaleService);
                return SaleService;
            }());
            exports_1("SaleService", SaleService);
        }
    }
});
//# sourceMappingURL=sale.service.js.map