import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { ComponentsModule } from './components';
import { BookExistsGuard } from './guards/book-exists';
import { BookFeatureStore } from './state/book-feature-store';
import { BookService } from './services/book.service';
import { CollectionService } from './services/collection.service';
import { SearchService } from './services/search.service';

import { FindBookPageComponent } from './containers/find-book-page';
import { ViewBookPageComponent } from './containers/view-book-page';
import { SelectedBookPageComponent } from './containers/selected-book-page';
import { CollectionPageComponent } from './containers/collection-page';
import { MaterialModule } from '../material';

import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    RouterModule.forChild([
      { path: 'find', component: FindBookPageComponent },
      {
        path: ':id',
        component: ViewBookPageComponent,
        canActivate: [BookExistsGuard],
      },
      { path: '', component: CollectionPageComponent },
    ]),

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('books', reducers),
  ],
  declarations: [
    FindBookPageComponent,
    ViewBookPageComponent,
    SelectedBookPageComponent,
    CollectionPageComponent,
  ],
  providers: [
    BookExistsGuard,
    BookFeatureStore,
    BookService,
    CollectionService,
    SearchService,
  ],
})
export class BooksModule {}
