import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
    selector: 'nav-bar',
    template: `
    <nav class="navbar navbar-default navbar-fixed-top" id="dnav">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" [routerLink]="['ItemList']">Item Tracker</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li [class.active]="_router.isRouteActive(_router.generate(['ItemList']))"><a [routerLink]="['ItemList']">Item List <span class="sr-only">(current)</span></a></li>
        <li [class.active]="_router.isRouteActive(_router.generate(['SaleList']))"><a [routerLink]="['SaleList']">Sales List</a></li>
        <li [class.active]="_router.isRouteActive(_router.generate(['StolenList']))"><a [routerLink]="['StolenList']">Stolen List</a></li>
        <li [class.active]="_router.isRouteActive(_router.generate(['SalesTax']))"><a [routerLink]="['SalesTax']">Sales Tax</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
            <li><a href="logout.php">Logout</a></li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
    `,
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['./css/nav.css']
})
export class NavBarComponent {
    constructor(private _router:Router){
        
    }
}