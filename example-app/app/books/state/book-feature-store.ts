import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from 'ng-app-state';
import { BookFeatureState } from './book-feature-state';

@Injectable()
export class BookFeatureStore extends AppStore<BookFeatureState> {
  constructor(store: Store<any>) {
    super(store, 'books', new BookFeatureState());
  }
}
