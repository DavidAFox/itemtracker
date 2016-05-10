System.register(['@angular/core/testing'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            }],
        execute: function() {
            testing_1.describe("a test", function () {
                testing_1.it("should be true", function () {
                    testing_1.expect(true).toBe(true);
                });
            });
        }
    }
});
//# sourceMappingURL=app.component.spec.js.map