import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
    name: 'myCurrency'
})
export class MyCurrencyPipe implements PipeTransform {
    transform(value:number) :string {
        return "$" + (value/100.0).toFixed(2);
    }
}