import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { debounce } from 'micro-dash';
import { Subscription } from 'rxjs/Subscription';
import { GoogleBooksService } from '../../core/services/google-books';
import { BookFeatureStore } from '../state/book-feature-store';
import { BookService } from './book.service';
import { Book } from '../models/book';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');

@Injectable()
export class SearchService {
  private debouncedSearch: (query: string) => void;
  private lastSearch?: Subscription;

  constructor(
    private store: BookFeatureStore,
    private bookService: BookService,
    private googleBooks: GoogleBooksService,
    @Optional()
    @Inject(SEARCH_DEBOUNCE)
    delay = 300
  ) {
    this.debouncedSearch = debounce(this.doSearch.bind(this), delay);
  }

  getSearchResults$() {
    return this.bookService.getById$(this.store('search')('ids').$);
  }

  search(query: string) {
    if (this.lastSearch) {
      this.lastSearch.unsubscribe();
    }
    if (query) {
      this.debouncedSearch(query);
      this.store('search').assign({
        loading: true,
        error: '',
        query,
      });
    } else {
      this.store('search').set({
        ids: [],
        loading: false,
        error: '',
        query,
      });
    }
  }

  private doSearch(query: string) {
    this.lastSearch = this.googleBooks
      .searchBooks(query)
      .subscribe(
        this.searchCompleted.bind(this),
        this.searchErrored.bind(this)
      );
  }

  private searchCompleted(books: Book[]) {
    this.store.batch(batch => {
      this.bookService.addBooks(books, batch);
      batch('search').assign({
        ids: books.map(book => book.id),
        loading: false,
        error: '',
      });
    });
  }

  private searchErrored(error: string) {
    this.store('search').assign({
      loading: false,
      error,
    });
  }
}
