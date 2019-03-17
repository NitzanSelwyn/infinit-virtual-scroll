import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProducsService {

  constructor(private http: HttpClient) { }

  GetProducts(index): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/getProducts',{skip:index})
  }

  FilterProducts(index,search): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/filter',{skip:index,search:search})
  }

}
