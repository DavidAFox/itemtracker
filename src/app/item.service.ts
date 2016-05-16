import {Injectable} from '@angular/core';
import {Item} from './item';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ItemService {
    private _apiUrl = "api/items/";
    constructor(private http:Http){
        
    }
    takenId(id:number):Observable<boolean> {
        return this.http.get(this._apiUrl + 'existingid' + '/' + id).map(this.extractData).catch(this.handleError);
    }
    getNextId():Observable<number> {
        return this.http.get(this._apiUrl + 'nextid').map(this.extractData).catch(this.handleError);
    }
    getItems():Observable<Item[]> {
        return this.http.get(this._apiUrl + 'list').map(this.extractData).catch(this.handleError);
    }
    getItem(index:number):Observable<Item> {
        return this.http.get(this._apiUrl + String(index)).map(this.extractData).catch(this.handleError);
    }
    getItemById(id:number):Observable<Item> {
        return this.http.get(this._apiUrl + "byid" + '/' + id).map(this.extractData).catch(this.handleError);
    }
    updateItem(item:Item):Observable<Item> {
        var body = JSON.stringify(item);
        var headers = new Headers({ 'Content-Type': 'application/json'});
        var options = new RequestOptions({headers: headers});
        return this.http.post(this._apiUrl + 'update', body, options).map(this.extractData).catch(this.handleError);
    }
    newItem(item:Item):Observable<Item> {
        var body = JSON.stringify(item);
        var headers = new Headers({ 'Content-Type': 'application/json'});
        var options = new RequestOptions({headers: headers}); 
        return this.http.post(this._apiUrl + 'new', body, options).map(this.extractData).catch(this.handleError);
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
                body.data.forEach(function(item) {
                    item.date = new Date(item.date);
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