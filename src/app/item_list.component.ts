import {Component} from '@angular/core';
import {ItemService} from './item.service';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {Item} from './item';
import {ItemModalComponent} from './item_modal.component';
import 'rxjs/Rx'


@Component ({
    selector: 'item-list',
    templateUrl : `dist/templates/item_list.template.html`,
    styleUrls: ['./css/item_list.css'],
    directives: [ItemModalComponent]
})
export class ItemListComponent implements OnInit{
    private items:Item[];
    private error;
    private showEmpty = false;
    private sort = '';
    private reversed = false;
    private nameMatch = false;
    private name:string = '';
    private showModal:boolean = false;
    private selectedItem =  new Item();
    constructor(private _itemService: ItemService, private _router:Router) {
    }
    getItems() {
        var that = this;
        this._itemService.getItems().subscribe(resp => {
            if(resp.success) {
                that.items = resp.data;
            } else {
                that.error = resp.error;
            }
        }, error => that.error = <any>error);
    }
    ngOnInit() {
        this.getItems();
    }
    sold(item) {
        var link = ['Sold', {id:item.id}];
        this._router.navigate(link);
    }
    stolen(item) {
        var link = ['Stolen', {id: item.id}];
        this._router.navigate(link);
    }
    hideItem(item:Item) {
        var that = this;
        if(!this.showEmpty && item.quantity < 1) {
            return true;
        }
        if(this.nameMatch && (item.name.toLowerCase().search(that.name.toLowerCase()) < 0)) {
            return true;
        }
        return false;
    }
    newItem() {
        var link = ["ItemNew"];
        this._router.navigate(link);
    }
    edit(item:Item) {
        this.selectedItem = Item.copy(item);
        $('#itemModal').modal('show');
//        var link = ['ItemEdit', {id: item.id}];
//        this._router.navigate(link);
    }
    reload(id) {
        var that = this;
        this.items.forEach((item, index) => {
            if(item.id === id) {
                that._itemService.getItem(id).subscribe(resp => {
                    if(resp.success) {
                        that.items[index] = resp.data;
                    } else {
                        that.error = resp.error;
                    }
                }, error => that.error=error);
            }
        }
        )
    }

    sortBy(type) {
        var that = this;
        if(this.sort === type) {
            this.reversed = !this.reversed;
        } else {
            that.reversed = false;
            that.sort = type;
        }

        this.items.sort(function(a, b){
            var x = 1;
            var y;
            var z;
            if(a[type].toLowerCase && b[type].toLowerCase) {
                y = a[type].toLowerCase();
                z = b[type].toLowerCase();                
            }else {
                y = a[type];
                z = b[type];
            }
            if(that.reversed) {
                x = -1;
            }
            if(y > z) {
                return 1*x;
            }else if(y < z) {
                return -1*x;
            }else {
                return 0;
            }
        })
    }
}