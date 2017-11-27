import { Injectable } from '@angular/core';
import { keyBy } from 'micro-dash';
import { StoreObject } from 'ng-app-state';
import { Book } from '../models/book';
import { BookFeatureState } from '../state/book-feature-state';

@Injectable()
export class BookService {
  addBooks(books: Book[], batch: StoreObject<BookFeatureState>) {
    batch('books')('entities').assign(keyBy(books, book => book.id));
  }
}
