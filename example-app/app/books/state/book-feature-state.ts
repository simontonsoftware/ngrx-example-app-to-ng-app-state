import { BooksState } from './books-state';
import { CollectionState } from './coolection-state';
import { SearchState } from './search-state';

export class BookFeatureState {
  search: SearchState;
  books: BooksState;
  collection: CollectionState;
}
