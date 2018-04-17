import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { CollectionService } from '../services/collection.service';

@Component({
  selector: 'bc-selected-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-book-detail
      [book]="book$ | async"
      [inCollection]="isSelectedBookInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)">
    </bc-book-detail>
  `,
})
export class SelectedBookPageComponent {
  book$: Observable<Book>;
  isSelectedBookInCollection$: Observable<boolean>;

  constructor(
    private bookService: BookService,
    private collectionService: CollectionService
  ) {
    this.book$ = bookService.getSelectedBook$() as Observable<Book>;
    this.isSelectedBookInCollection$ = collectionService.getIsSelectedBookInCollection$();
  }

  addToCollection(book: Book) {
    this.collectionService.addBook(book);
  }

  removeFromCollection(book: Book) {
    this.collectionService.removeBook(book);
  }
}
