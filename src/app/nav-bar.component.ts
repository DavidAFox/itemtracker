import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

@Component({
    selector: 'nav-bar',
    templateUrl: 'dist/templates/nav-bar.template.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['./css/nav.css']
})
export class NavBarComponent {
    constructor(private _router:Router){
        
    }
}