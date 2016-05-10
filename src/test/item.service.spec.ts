import {it, describe, expect, injectAsync, beforeEachProviders } from '@angular/core/testing';
import {ItemService} from "../app/item.service";
import {provide} from "@angular/core";
import {Item} from "../app/item";
import {HTTP_PROVIDERS, XHRBackend  } from "@angular/http";
import {MockBackend} from "@angular/http/testing";

describe("Item Service", function(){
    beforeEachProviders(() => {
        return [
            HTTP_PROVIDERS,
           provide(XHRBackend, {useClass: MockBackend})
//           ItemService
        ];
    });
    var items:Item[] = [
            {
                id: 1,
                name: "hat",
                price: 10.50,
                salePrice: 9.50,
                quantity: 5,
                description: "This is a hat.",
                date: new Date()
            },
            {
                id: 2,
                name: "shoe",
                price: 3.50,
                salePrice: 2.49,
                quantity: 3,
                description: "This is a pair of shoes.",
                date: new Date()
            }
        ]
    describe("takenId", function() {
        it("should return true for 1", function (){
            var i = new Item();
        })
        it("should return false for 100", function (){
            
        })
    })
    it("should return an item with id", function() {
        
    })
})