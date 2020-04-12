import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import {TreeNode} from 'primeng/common/api';

@Injectable()
export class TreeNodeService {

    constructor(private http: HttpClient) {
    }

    getTouristPlaces(): Observable<any[]> {
        return this.http.get('content/primeng/assets/data/json/places/places.json')
            .pipe(map((response: any[]) => response));
    }
}
