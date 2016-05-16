System.register(['@angular/core/testing', "@angular/core", "../app/item", "@angular/http", "@angular/http/testing"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1, core_1, item_1, http_1, testing_2;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (item_1_1) {
                item_1 = item_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (testing_2_1) {
                testing_2 = testing_2_1;
            }],
        execute: function() {
            testing_1.describe("Item Service", function () {
                testing_1.beforeEachProviders(function () {
                    return [
                        http_1.HTTP_PROVIDERS,
                        core_1.provide(http_1.XHRBackend, { useClass: testing_2.MockBackend })
                    ];
                });
                var items = [
                    {
                        index: 1,
                        id: 1,
                        name: "hat",
                        price: 10.50,
                        salePrice: 9.50,
                        quantity: 5,
                        description: "This is a hat.",
                        date: new Date(),
                        didntsell: false
                    },
                    {
                        index: 1,
                        id: 2,
                        name: "shoe",
                        price: 3.50,
                        salePrice: 2.49,
                        quantity: 3,
                        description: "This is a pair of shoes.",
                        date: new Date(),
                        didntsell: false
                    }
                ];
                testing_1.describe("takenId", function () {
                    testing_1.it("should return true for 1", function () {
                        var i = new item_1.Item();
                    });
                    testing_1.it("should return false for 100", function () {
                    });
                });
                testing_1.it("should return an item with id", function () {
                });
            });
        }
    }
});
//# sourceMappingURL=item.service.spec.js.map