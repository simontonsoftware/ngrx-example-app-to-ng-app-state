import { Injectable } from '@angular/core';
import { keyBy } from 'micro-dash';
import { StoreObject } from 'ng-app-state';
import { Observable } from 'rxjs/Observable';
import { map, withLatestFrom } from 'rxjs/operators';
import { Book } from '../models/book';
import { BookFeatureState } from '../state/book-feature-state';
import { BookFeatureStore } from '../state/book-feature-store';

@Injectable()
export class BookService {
  constructor(private store: BookFeatureStore) {}

  addBooks(books: Book[], batch: StoreObject<BookFeatureState>) {
    batch('books')('entities').assign(keyBy(books, book => book.id));
  }

  getSelectedBook$() {
    return this.store('books')('entities').$.pipe(
      withLatestFrom(this.store('books')('selectedBookId').$),
      map(([entities, id]) => (id === undefined ? undefined : entities[id]))
    );
  }

  getById$(ids$: Observable<string[]>) {
    return this.store('books')('entities').$.pipe(
      withLatestFrom(ids$),
      map(([entities, ids]) => ids.map(id => entities[id]))
    );
  }
}
