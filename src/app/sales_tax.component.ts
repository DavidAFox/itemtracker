import {Component, OnInit } from '@angular/core';
import {ItemService} from './item.service';
import {SaleService} from './sale.service';
import {Sale} from './sale';
import {Item} from './item';
import {Router} from '@angular/router-deprecated';

@Component({
    selector: "sales-tax",
    templateUrl: `/dist/templates/sales_tax.template.html`
})
export class SalesTaxComponent implements OnInit{
    private sales:Sale[] = [];
    private itemNames = {};
    private startMonth:number;
    private startDay:number;
    private startYear:number;
    private endMonth:number;
    private endDay:number;
    private endYear:number;
    private startDate:Date;
    private endDate:Date;
    private error;
    private datesSelected = true;
    constructor(private _itemService: ItemService, private _saleService: SaleService, private _router:Router ) {
        this.startDate = new Date();
        this.startDate.setMonth(Math.floor(this.startDate.getMonth() / 3) * 3);
        this.startDate.setDate(1);
        this.endDate = new Date();
        this.endDate.setMonth(Math.floor(this.startDate.getMonth())+3);
        this.endDate.setDate(0);
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
        this.getSalesWithDates(this.startDate, this.endDate)
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
                        } else {
                            that.error = itemResp.error
                        }
                    })
                })
            } else {
                that.error = resp.error
            }
        }, error=> that.error = error);
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
    }
    total(sales:Sale[]) {
        return sales.reduce(function(total, sale) {
            return total + (sale.price * sale.quantity * sale.sTaxRate);    
        }, 0)
    }
    edit(sale:Sale) {
        var link = ['SaleEdit', {id: sale.id}];
        this._router.navigate(link);
    }
}