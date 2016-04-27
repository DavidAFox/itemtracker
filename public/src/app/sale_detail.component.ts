import {Component, Input} from 'angular2/core';
import {Sale} from './sale';
import {Item} from './item';

@Component({
    selector: 'sale-detail',
    template: `
        <h3>{{item.name}} #{{item.id}}</h3>
        <p>{{item.description}}</p>
        <table>
        <tr><td><label>Handling Fee</label></td><td><input type="number" min="0"[(ngModel)]="sale.fee"/></td></tr>
        <tr><td><label>Quantity Sold</label></td><td><input type="number" min="0" [(ngModel)]="sale.quantity"/></td></tr>
        <tr><td><label>Sales Tax Rate</label></td><td><input type="number" min="0" [(ngModel)]="sale.sTaxRate"/></td></tr>
        <tr><td><label>Price</label></td><td><input type="number" min="0"[(ngModel)]="sale.price"/></td></tr>
        <tr><td><label>Date</label></td><td>
            <label>M</label><input type="number" min="1" max="12" [(ngModel)]="item.month"/>
            <label>D</label><input type="number" min="1" max="31" [(ngModel)]="item.day"/>
            <label>Y</label><input type="number" min="1900" max="9999" [(ngModel)]="item.year"/>
        </td></tr>
        <tr><td><label>Where</label></td><td><input type="text" [(ngModel)]="sale.where"/></td></tr>
        <tr><td><label>Comment</label></td><td><textarea rows="5" cols="30"></textarea></td></tr>
        </table>    
    `
})
export class SaleDetailComponent {
    @Input()
    sale: Sale;
    @Input()
    item: Item;
}