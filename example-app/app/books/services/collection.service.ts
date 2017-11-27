import { Injectable } from '@angular/core';
import { Database } from '@ngrx/db';
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
    return this.bookService.getById$(this.store('collection')('ids').$);
  }

  load() {
    this.store('collection')('loading').set(true);
    this.db.query('books').toArray().subscribe(this.loadSucceeded.bind(this));
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
