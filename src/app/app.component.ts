import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import {ItemListComponent} from './item_list.component';
import {SoldComponent} from './sold.component';
import {ItemService} from './item.service';
import {StolenComponent} from './stolen.component';
import {ItemEditComponent} from './item_edit.component';
import {ItemNewComponent} from './item_new.component';
import {ItemRemoveComponent} from './item_remove.component';
import {SaleListComponent} from './sale_list.component';
import {SaleService} from './sale.service';
import {SaleEditComponent} from './sale_edit.component';
import {NavBarComponent} from './nav-bar.component';
import {HTTP_PROVIDERS } from '@angular/http';
import {StolenListComponent} from './stolen_list.component';
import {StolenService} from './stolen.service';
import {StolenEditComponent} from './stolen_edit.component';
import {SalesTaxComponent} from './sales_tax.component';

@Component({
	selector: 'my-app',
	template: `
		<nav-bar></nav-bar>
		<br>
		<br>
		<br>
		<router-outlet></router-outlet>
	`,
	directives: [ROUTER_DIRECTIVES, NavBarComponent],
	providers: [ItemService, SaleService, StolenService, HTTP_PROVIDERS]
})
@RouteConfig([
	{
		path: '/itemlist',
		name: 'ItemList',
		component: ItemListComponent,
		useAsDefault: true
	},
	{
		path: '/sold/:id',
		name: 'Sold',
		component: SoldComponent
	},
	{
		path: '/stolen/:id',
		name: 'Stolen',
		component: StolenComponent
	},
	{
		path: '/item/:id',
		name: 'ItemEdit',
		component: ItemEditComponent
	},
	{
		path: '/item',
		name: 'ItemNew',
		component: ItemNewComponent
	},
	{
		path: '/remove/:id',
		name: 'ItemRemove',
		component: ItemRemoveComponent
	},
	{
		path: '/salelist',
		name: 'SaleList',
		component: SaleListComponent
	},
	{
		path: '/sale/:id',
		name: 'SaleEdit',
		component: SaleEditComponent
	},
	{
		path: '/stolenlist',
		name: 'StolenList',
		component: StolenListComponent
	},
	{
		path: '/stolen/edit/:id',
		name: 'StolenEdit',
		component: StolenEditComponent
	},
	{
		path: '/salestax',
		name: 'SalesTax',
		component: SalesTaxComponent
	},
	{
		path: '/**',
		component: ItemListComponent
	}
])
export class AppComponent { }