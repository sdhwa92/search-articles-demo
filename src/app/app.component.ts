import { ItemList } from './models/item-list';
import { Hit } from './models/hit';
import { ApiService } from './services/api.service';
import { Observable } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Search Articles Demo';
  keyword = '';
  currentPage = 0;
  totalPage = 0;

  result$: Observable<any>;
  private _onDestroy$: Subject<void> = new Subject<void>();
  private _inputChange$: Subject<void> = new Subject<void>();
  private _debounceTime = 500;

  constructor(private apiService: ApiService)
  {
    this.result$ = apiService.getSearchResults();
  }

  public ngOnInit(): void
  {
    // Subscribe input changes
    this._inputChange$.pipe(
      debounceTime(this._debounceTime),
      takeUntil(this._onDestroy$)
    )
    .subscribe(
      () => {
        // console.log(keyword);
        this.result$ = this.apiService.getSearchResults(this.keyword);
      }
    );
  }

  public ngOnDestroy(): void 
  {
    this._onDestroy$.next();
  }

  public onSearch()
  {
    // console.log(event.target.value);
    this._inputChange$.next();
  }

  public paginate(currentPage: number, direction: 'prev' | 'next', totalPage: number)
  {
    let page = currentPage;
    if (currentPage == 0 ) 
    {
      page = direction == 'prev' ? page : page + 1;
    }
    else if (currentPage > 0 && currentPage < totalPage - 1)  
    {
      page = direction == 'prev' ? page - 1 : page + 1;
    }
    else if (currentPage == (currentPage - 1))
    {
      page = direction == 'prev' ? page - 1 : page;
    }

    if (currentPage != page) 
    {
      this.result$ = this.apiService.getSearchResults(this.keyword, page);   
    }
  }
}
