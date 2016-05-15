import {Component} from '@angular/core';
import {StolenService} from './stolen.service';
import {ItemService} from './item.service';
import {Router} from '@angular/router-deprecated';
import {OnInit} from '@angular/core'
import {Stolen} from './stolen';
import {Item} from './item';
import {StolenModalComponent} from './stolen_modal.component';
declare var $:any;

@Component({
    selector: 'stolen-list',
    templateUrl: '/dist/templates/stolen_list.template.html',
    directives: [StolenModalComponent]
})
export class StolenListComponent implements OnInit{
    private stolens: Stolen[] = [];
    private error;
    private itemNames = {};
    private items = {};
    private sort = '';
    private reversed = false;
    private startMonth:number;
    private startDay:number;
    private startYear:number;
    private endMonth:number;
    private endDay:number;
    private endYear:number;
    private startDate:Date;
    private endDate:Date;
    private datesSelected = false;
    private selectedStolen = new Stolen();
    private selectedItem = new Item();
    constructor(private _stolenService:StolenService, private _itemService: ItemService, private _router:Router) {
        this.startDate = new Date();
        this.startDate.setMonth(this.startDate.getMonth()-1);
        this.endDate = new Date();
        this.startMonth = this.startDate.getMonth()+1;
        this.startDay = this.startDate.getDate();
        this.startYear = this.startDate.getFullYear();
        this.endMonth = this.endDate.getMonth() + 1;
        this.endDay = this.endDate.getDate();
        this.endYear = this.endDate.getFullYear();
        this.endDate.setHours(23);
        this.endDate.setMinutes(59)
        this.startDate.setHours(0);
        this.startDate.setMinutes(0);
        
    }
    ngOnInit() {
        this.getStolens();
    }
    getStolens() {
        var that = this;
        this._stolenService.getStolens().subscribe(data =>{
            that.stolens = data;
            that.stolens.forEach(stolen =>{
                that._itemService.getItem(stolen.itemId).subscribe(item =>{
                        that.itemNames[stolen.itemId] = item.name;
                        that.items[stolen.id] = item;
                }, error => that.error = error)
            })    
        }, error=>that.error = error);
        this.sort = '';
        this.reversed = false;
    }
    getStolensWithDates(starting:Date, ending:Date) {
        var that = this;
        this._stolenService.getStolens(starting, ending).subscribe(data =>{
            that.stolens = data;
            that.stolens.forEach(stolen =>{
                that._itemService.getItem(stolen.itemId).subscribe(item =>{
                        that.itemNames[stolen.itemId] = item.name;
                        that.items[stolen.id] = item;
                }, error => that.error = error)
            })    
        }, error=>that.error=error);
        this.sort = '';
        this. reversed = false;
    }
    updateDates() {
        this.startDate.setMonth(this.startMonth-1);
        this.startDate.setDate(this.startDay);
        this.startDate.setFullYear(this.startYear);
        this.endDate.setMonth(this.endMonth-1);
        this.endDate.setDate(this.endDay);
        this.endDate.setFullYear(this.endYear);
        this.endDate.setHours(23);
        this.endDate.setMinutes(59)
        this.startDate.setHours(0);
        this.startDate.setMinutes(0);
        if(this.datesSelected) {
            this.getStolensWithDates(this.startDate, this.endDate);
        } else {
            this.getStolens();
        }
    }
    updateStolens() {
        if(this.datesSelected) {
            this.getStolensWithDates(this.startDate, this.endDate);
        } else {
            this.getStolens();
        }
    }
    total(stolens) {
        return stolens.reduce(function(total:number, stolen) {
            return total + (stolen.price * stolen.quantity);
        }, 0)
    }
    edit(stolen:Stolen) {
//        var link = ['StolenEdit', {id: stolen.id}];
//        this._router.navigate(link);
        this.selectedStolen = Stolen.copy(stolen);
        this.selectedItem = Item.copy(this.items[stolen.id])
        $('#stolenModal').modal('show');
    }
    reload(id) {
        var that = this;
        that.stolens.forEach( (stolen, index) => {
            if(stolen.id === id) {
                that._stolenService.getStolen(id).subscribe(stolen => {
                    that.stolens[index] = stolen;
                }, error => that.error = error);
            }
        });
    }
    sortBy(type) {
        if(this.sort === type) {
            this.reversed = !this.reversed;
        } else {
            this.reversed = false;
        }
        var that = this;
        this.stolens.sort(function(a:Stolen, b:Stolen){
            var x = 1;
            var y;
            var z;
            if(a[type] && b[type] && a[type].toLowerCase && b[type].toLowerCase) {
                y = a[type].toLowerCase;
                z = b[type].toLowerCase;                
            } else if(type === 'name') {
                y = that.itemNames[a['itemId']].toLowerCase();
                z = that.itemNames[b['itemId']].toLowerCase();
            } else if(type === 'totalStolen') {
                y = a.price * a.quantity;
                z = b.price * b.quantity;
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
        that.sort = type;
    }    
}