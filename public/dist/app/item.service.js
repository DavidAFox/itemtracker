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
    var ItemService;
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
            ItemService = (function () {
                function ItemService(http) {
                    this.http = http;
                    this._apiUrl = "api/items/";
                }
                ItemService.prototype.takenId = function (id) {
                    return this.http.get(this._apiUrl + 'validid' + '/' + id).map(this.extractData).catch(this.handleError);
                };
                ItemService.prototype.getItems = function () {
                    return this.http.get(this._apiUrl + 'list').map(this.extractData).catch(this.handleError);
                };
                ItemService.prototype.getItem = function (id) {
                    return this.http.get(this._apiUrl + String(id)).map(this.extractData).catch(this.handleError);
                };
                ItemService.prototype.updateItem = function (item) {
                    var body = JSON.stringify(item);
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this.http.post(this._apiUrl + 'update', body, options).map(this.extractData).catch(this.handleError);
                };
                ItemService.prototype.newItem = function (item) {
                    var body = JSON.stringify(item);
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this.http.post(this._apiUrl + 'new', body, options).map(this.extractData).catch(this.handleError);
                };
                ItemService.prototype.extractData = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Bad response status: ' + res.status);
                    }
                    var body = res.json();
                    if (!body.success) {
                        throw new Error(body.error);
                    }
                    if (body.data) {
                        if (body.data.forEach) {
                            body.data.forEach(function (item) {
                                item.date = new Date(item.date);
                            });
                        }
                        else {
                            if (body.data.date) {
                                body.data.date = new Date(body.data.date);
                            }
                        }
                    }
                    return body || {};
                };
                ItemService.prototype.handleError = function (error) {
                    var errMsg = error.message || 'Server error';
                    console.error(errMsg);
                    return Observable_1.Observable.throw(errMsg);
                };
                ItemService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ItemService);
                return ItemService;
            }());
            exports_1("ItemService", ItemService);
        }
    }
});
//# sourceMappingURL=item.service.js.map