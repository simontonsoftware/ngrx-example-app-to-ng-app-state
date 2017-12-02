import { Injectable } from '@angular/core';
import { Database } from '@ngrx/db';
import { pull } from 'micro-dash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toArray';
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
  ) {
    db.open('books_app');
  }

  getBookCollection$() {
    return this.bookService.getById$(this.store('collection')('ids').$);
  }

  getIsSelectedBookInCollection$() {
    return this.store('collection')('ids').$
      .withLatestFrom(this.store('books')('selectedBookId').$)
      .map(([ids, selected]) => (selected ? ids.includes(selected) : false));
  }

  load() {
    this.store('collection')('loading').set(true);
    this.db.query('books').toArray().subscribe(this.loadSucceeded.bind(this));
  }

  addBook(book: Book) {
    this.db.insert('books', [book]).subscribe(
      () => {
        this.doAddBook(book);
      },
      () => {
        this.doRemoveBook(book);
      }
    );
  }

  removeBook(book: Book) {
    this.db.executeWrite('books', 'delete', [book.id]).subscribe(
      () => {
        this.doRemoveBook(book);
      },
      () => {
        this.doAddBook(book);
      }
    );
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

  private doAddBook(book: Book) {
    this.store('collection')('ids').mutateUsing(ids => {
      if (!ids.includes(book.id)) {
        ids.push(book.id);
      }
    });
  }

  private doRemoveBook(book: Book) {
    this.store('collection')('ids').mutateUsing(pull, book.id);
  }
}
