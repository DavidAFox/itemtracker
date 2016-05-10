System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Item;
    return {
        setters:[],
        execute: function() {
            Item = (function () {
                function Item() {
                    this.id = null;
                    this.name = "";
                    this.price = 0;
                    this.salePrice = 0;
                    this.description = "";
                    this.date = new Date();
                }
                return Item;
            }());
            exports_1("Item", Item);
        }
    }
});
//# sourceMappingURL=item.js.map