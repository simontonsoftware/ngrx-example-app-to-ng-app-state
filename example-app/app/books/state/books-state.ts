import { ObjectWith } from 'micro-dash';
import { Book } from '../models/book';

export class BooksState {
  selectedBookId?: string;
  ids: string[] = [];
  entities: ObjectWith<Book> = {};
}
