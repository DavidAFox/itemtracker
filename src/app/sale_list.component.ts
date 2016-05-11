import {Component, OnInit} from '@angular/core';
import {SaleService} from './sale.service';
import {ItemService} from './item.service';
import {Router} from '@angular/router-deprecated';
import {Sale} from './sale';
import {Item} from './item';
import {SaleModalComponent} from './sale_modal.component';
declare var $:any;

@Component({
    selector: 'sale-list',
    templateUrl : `/dist/templates/sale_list.template.html`,
    styleUrls: ['./css/sale_list.css'],
    directives: [SaleModalComponent]
})
export class SaleListComponent implements OnInit{
    private sales = [];
    private itemNames = {};
    private items = {};
    private startMonth:number;
    private startDay:number;
    private startYear:number;
    private endMonth:number;
    private endDay:number;
    private endYear:number;
    private startDate:Date;
    private endDate:Date;
    private datesSelected = false;
    private error;
    private location:string = '';
    private locationSelected:boolean = false;
    private sort:string = '';
    private reversed: boolean = false;
    private selectedSale = new Sale();
    private selectedItem:Item = new Item();
    constructor(private _saleService: SaleService, private _itemService: ItemService, private _router: Router) {
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
    ngOnInit(){
        this.getSales();
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
            this.getSalesWithDates(this.startDate, this.endDate);
        } else {
            this.getSales();
        }
    }
    updateSales() {
        if(this.datesSelected) {
            this.getSalesWithDates(this.startDate, this.endDate);
        } else {
            this.getSales();
        }
    }
    getSales() {
        var that = this;
        this._saleService.getSales().subscribe(function(resp) {
            if(resp.success) {
                that.sales = resp.data;
                that.sales.forEach(function(sale) {
                    that._itemService.getItem(sale.itemId).subscribe(function(itemResp) {
                        if(itemResp.success) {
                           that.itemNames[sale.itemId] = itemResp.data.name;
                           that.items[sale.id] = itemResp.data;
                        } else {
                            that.error = itemResp.error
                        }
                    })
                })
            } else {
                that.error = resp.error
            }
        }, error=> that.error = error);
        this.sort = '';
        this.reversed = false;
    }
    getSalesWithDates(start:Date, end:Date) {
        var that = this;
        this._saleService.getSales(start, end).subscribe(function(resp) {
            if(resp.success) {
                that.sales = resp.data;
                that.sales.forEach(function(sale) {
                    that._itemService.getItem(sale.itemId).subscribe(function(itemResp) {
                        if(itemResp.success) {
                           that.itemNames[sale.itemId] = itemResp.data.name;
                        } else {
                            that.error = itemResp.error
                        }
                    })
                })
            } else {
                that.error = resp.error
            }
        }, error=> that.error = error)
        this.sort = '';
        this.reversed = false;
    }
    edit(sale){
        this.selectedSale = Sale.copy(sale);
        this.selectedItem = Item.copy(this.items[sale.id]);
        $('#saleModal').modal('show');
//        var link = ['SaleEdit', {id: sale.id}];
//        this._router.navigate(link);
    }
    hidden(sale:Sale) :boolean {
        var that = this;
        if(that.locationSelected && !that.locMatch(sale.where)) {
            return true;
        }
        return false;
    }
    total(sales) {
        var that = this;        
        return sales.reduce(function(total, sale) {
            if(that.hidden(sale)) {
                return total;
            }
            return total+(sale.price * sale.quantity);
        }, 0)
    }
    locMatch(where:string) {
        return where.toLocaleLowerCase().search(this.location.toLocaleLowerCase()) != -1;
    }
    reload(id) {
        var that = this;
        this.sales.forEach((sale, index) => {
            if(sale.id === id) {
                that._saleService.getSale(id).subscribe(resp => {
                    if(resp.success) {
                        that.sales[index] = resp.data;
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
        this.sales.sort(function(a:Sale, b:Sale){
            var x = 1;
            var y;
            var z;
            if(a[type] && b[type] && a[type].toLowerCase && b[type].toLowerCase) {
                y = a[type].toLowerCase();
                z = b[type].toLowerCase();                
            }else if(type === 'name') {
                y = that.itemNames[a['itemId']].toLowerCase();
                z = that.itemNames[b['itemId']].toLowerCase();
            } else if (type ==='totalSale') {
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
    }    
}
