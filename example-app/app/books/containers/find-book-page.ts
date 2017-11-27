import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Book } from '../models/book';
import { SearchService } from '../services/search.service';
import { BookFeatureStore } from '../state/book-feature-store';

@Component({
  selector: 'bc-find-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-book-search [query]="searchQuery" [searching]="loading$ | async" [error]="error$ | async" (search)="search($event)"></bc-book-search>
    <bc-book-preview-list [books]="books$ | async"></bc-book-preview-list>
  `,
})
export class FindBookPageComponent {
  searchQuery: string;
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private store: BookFeatureStore,
    private searchService: SearchService
  ) {
    this.searchQuery = store.state().search.query;
    this.books$ = searchService.getSearchResults$();
    this.loading$ = store('search')('loading').$;
    this.error$ = store('search')('error').$;
  }

  search(query: string) {
    this.searchService.search(query);
  }
}
