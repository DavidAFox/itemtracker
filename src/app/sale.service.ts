import {Injectable} from '@angular/core';
import {Sale} from './sale';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class SaleService {
    private apiUrl = "/api/sales/";
    constructor(private http:Http){
        
    }    
    getSales(starting?:Date, ending?:Date):Observable<Sale[]> {
        if(starting && ending) {
            var params = new URLSearchParams();
            params.set('starting', starting.toISOString());
            params.set('ending', ending.toISOString());
            var options = new RequestOptions({search: params});
            return this.http.get(this.apiUrl + 'list', options).map(this.extractData).catch(this.handleError);
        }
        return this.http.get(this.apiUrl + 'list').map(this.extractData).catch(this.handleError);
    }
    getSale(id:number):Observable<Sale> {
        return this.http.get(this.apiUrl + id).map(this.extractData).catch(this.handleError);
    }
    updateSale(sale:Sale):Observable<Sale> {
        var body = JSON.stringify(sale);
        console.log(body);
        var headers = new Headers({ 'Content-Type': 'application/json'});
        var options = new RequestOptions({headers: headers});
        return this.http.post(this.apiUrl + "update", body, options).map(this.extractData).catch(this.handleError);
    }
    newSale(sale:Sale):Observable<Sale> {
        var body = JSON.stringify(sale);
        var headers = new Headers({ 'Content-Type': 'application/json'});
        var options = new RequestOptions({headers: headers});
        return this.http.post(this.apiUrl + "new", body, options).map(this.extractData).catch(this.handleError);
    }
    private extractData(res: Response) {
        if (res.status < 200 || res.status >=300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        if(!body.success) {
            throw new Error(body.error)
        }
        if(body.data) {
            if(body.data.forEach) {
                body.data.forEach(function(sale) {
                    sale.date = new Date(sale.date);
                })
            } else {
                if(body.data.date) {
                    body.data.date = new Date(body.data.date);
                }
            }
        }
        return body.data || {};
    }
    private handleError (error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
