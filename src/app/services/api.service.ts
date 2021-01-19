import { Hit } from './../models/hit';
import { Item } from './../models/item';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _apiBaseUrl = 'http://hn.algolia.com/api/v1/'

  constructor(private http:HttpClient) { }

  public getItems(itemId: number): Observable<Item[]>
  {
    return this.http.get<Item[]>(`${this._apiBaseUrl}/items/${itemId}`);
  }

  public getSearchResults(keyword = '', page = 0, hitsPerPage = 10, tags = 'story'): Observable<Hit>
  {
    let queryString = '';

    if (!!keyword)
    {
      queryString += `query=${keyword}&`;
    }

    queryString += `tags=${tags}&page=${page}&hitsPerPage=${hitsPerPage}`;

    return this.http.get<Hit>(`${this._apiBaseUrl}/search_by_date?${queryString}`);
  }
}
