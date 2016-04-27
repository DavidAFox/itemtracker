import {Component, Input} from 'angular2/core';
import {Item} from './item';

@Component({
    selector: 'item-detail',
    template: `
        <table>
            <tr><td><label>Product #</label></td><td><input type="number" [(ngModel)]="item.id"/></td></tr>
            <tr><td><label>Name</label></td><td><input type="text" [(ngModel)]="item.name"/></td></tr>
            <tr><td><label>Description</label></td><td><textarea [(ngModel)]="item.description"></textarea></td></tr>
            <tr><td><label>Price</label></td><td><input type="number" min="0" [(ngModel)]="item.price"/></td></tr>
            <tr><td><label>Sale Price</label></td><td><input type="number" min="0" [(ngModel)]="item.salePrice"/></td></tr>
            <tr><td><label>Quantity</label></td><td><input type="number" min="0" [(ngModel)]="item.quantity"/></td></tr>
            <tr><td><label>Date Added</label></td><td>
                <label>M</label><input type="number" min="1" max="12" [(ngModel)]="item.month"/>
                <label>D</label><input type="number" min="1" max="31" [(ngModel)]="item.day"/>
                <label>Y</label><input type="number" min="1900" max="9999" [(ngModel)]="item.year"/>
            </td></tr>
       </table>    
    `
})
export class ItemDetailComponent {
    @Input()
    item: Item;
}