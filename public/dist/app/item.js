System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Item;
    return {
        setters:[],
        execute: function() {
            Item = (function () {
                function Item() {
                    this.index = null;
                    this.id = null;
                    this.name = "";
                    this.price = 0;
                    this.salePrice = 0;
                    this.description = "";
                    this.date = new Date();
                    this.didntsell = false;
                }
                Item.copy = function (item) {
                    var newItem = new Item();
                    newItem.index = item.index;
                    newItem.id = item.id;
                    newItem.name = item.name;
                    newItem.price = item.price;
                    newItem.salePrice = item.salePrice;
                    newItem.quantity = item.quantity;
                    newItem.description = item.description;
                    newItem.date = item.date;
                    newItem.didntsell = item.didntsell;
                    return newItem;
                };
                return Item;
            }());
            exports_1("Item", Item);
        }
    }
});
//# sourceMappingURL=item.js.map