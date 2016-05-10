import {Injectable} from '@angular/core';
import {Item} from './item';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions, URLSearchParams  } from '@angular/http';
import {Stolen} from './stolen';
import 'rxjs/Rx';

@Injectable()
export class StolenService {
    private _apiUrl = "/api/stolen/"
    constructor(private http:Http) {
        
    }
    getStolens(starting?:Date, ending?:Date) {
        if(starting && ending) {
            var params = new URLSearchParams();
            params.set('starting', starting.toISOString());
            params.set('ending', ending.toISOString());
            var options = new RequestOptions({search: params});
            return this.http.get(this._apiUrl + 'list', options).map(this.extractData).catch(this.handleError);
        }
        return this.http.get(this._apiUrl + 'list').map(this.extractData).catch(this.handleError);
    }
    getStolen(id:number) {
        return this.http.get(this._apiUrl + id).map(this.extractData).catch(this.handleError);
    }
    newStolen(stolen:Stolen) {
        var body = JSON.stringify(stolen);
        var headers = new Headers({ 'Content-Type': 'application/json'});
        var options = new RequestOptions({headers: headers});
        return this.http.post(this._apiUrl + 'new', body, options).map(this.extractData).catch(this.handleError);
    }
    updateStolen(stolen:Stolen) {
        var body = JSON.stringify(stolen);
        var headers = new Headers({ 'Content-Type': 'application/json'});
        var options = new RequestOptions({headers: headers});
        return this.http.post(this._apiUrl + 'update', body, options).map(this.extractData).catch(this.handleError);
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