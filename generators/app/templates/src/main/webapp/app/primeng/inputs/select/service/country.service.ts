import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import Country from './country';

@Injectable()
export class CountryService {

    constructor(private http: HttpClient) {
    }

    getCountries(): Observable<any> {
        return this.http.get('content/primeng/assets/data/json/countries/countries.json')
            .pipe(map((response: Country[]) => response));
    }
}
