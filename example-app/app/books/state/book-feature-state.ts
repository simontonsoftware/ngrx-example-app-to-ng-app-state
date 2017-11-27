import { BooksState } from './books-state';
import { CollectionState } from './coolection-state';
import { SearchState } from './search-state';

export class BookFeatureState {
  search = new SearchState();
  books = new BooksState();
  collection = new CollectionState();
}
