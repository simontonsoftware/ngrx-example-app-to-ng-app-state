import { Injectable } from '@angular/core';
import { keyBy } from 'micro-dash';
import { StoreObject } from 'ng-app-state';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import { Observable } from 'rxjs/Observable';
import { Book } from '../models/book';
import { BookFeatureState } from '../state/book-feature-state';
import { BookFeatureStore } from '../state/book-feature-store';

@Injectable()
export class BookService {
  constructor(private store: BookFeatureStore) {}

  addBooks(books: Book[], batch: StoreObject<BookFeatureState>) {
    batch('books')('entities').assign(keyBy(books, book => book.id));
  }

  getById$(ids$: Observable<string[]>) {
    return this.store('books')('entities').$
      .withLatestFrom(ids$)
      .map(([entities, ids]) => ids.map(id => entities[id]));
  }
}
