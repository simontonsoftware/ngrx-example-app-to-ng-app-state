import { Injectable } from '@angular/core';
import { Database } from '@ngrx/db';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import { Book } from '../models/book';
import { BookFeatureStore } from '../state/book-feature-store';
import { BookService } from './book.service';

@Injectable()
export class CollectionService {
  constructor(
    private store: BookFeatureStore,
    private bookService: BookService,
    private db: Database
  ) {}

  getBookCollection$() {
    return this.store('books')('entities').$
      .withLatestFrom(this.store('collection')('ids').$)
      .map(([entities, ids]) => ids.map(id => entities[id]));
  }

  load() {
    this.store('collection')('loading').set(true);
    this.db
      .query('books')
      .toArray()
      .toPromise()
      .then(this.loadSucceeded.bind(this))
      .catch(() => {
        debugger;
      });
  }

  private loadSucceeded(books: Book[]) {
    this.store.batch(batch => {
      this.bookService.addBooks(books, batch);
      batch('collection').set({
        loaded: true,
        loading: false,
        ids: books.map(book => book.id),
      });
    });
  }
}
