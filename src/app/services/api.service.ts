import { Hit } from './../models/hit';
import { Item } from './../models/item';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiBaseUrl = 'http://hn.algolia.com/api/v1/'

  constructor(private http:HttpClient) { }

  public getItems(itemId: number): Observable<Item[]>
  {
    return this.http.get<Item[]>(`${this.apiBaseUrl}/items/${itemId}`);
  }

  public getSearchResults(keyword = '', page = 0, hitsPerPage = 10, tags = 'story'): Observable<Hit>
  {
    console.log('getSearchResults');
    let queryString = '';

    if (!!keyword)
    {
      queryString += `query=${keyword}&`;
    }

    queryString += `tags=${tags}&page=${page}&hitsPerPage=${hitsPerPage}`;

    return this.http.get<Hit>(`${this.apiBaseUrl}/search_by_date?${queryString}`);
  }
}
