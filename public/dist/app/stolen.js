System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Stolen;
    return {
        setters:[],
        execute: function() {
            Stolen = (function () {
                function Stolen() {
                    this.id = 0;
                    this.itemId = 0;
                    this.quantity = 0;
                    this.date = new Date();
                    this.price = 0;
                }
                Stolen.copy = function (stolen) {
                    var newStolen = new Stolen();
                    newStolen.id = stolen.id;
                    newStolen.itemId = stolen.itemId;
                    newStolen.quantity = stolen.quantity;
                    newStolen.date = stolen.date;
                    newStolen.price = stolen.price;
                    return newStolen;
                };
                return Stolen;
            }());
            exports_1("Stolen", Stolen);
        }
    }
});
//# sourceMappingURL=stolen.js.map