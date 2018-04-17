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
     * Required only for interoperability with RouterModule
     */
    StoreModule.forFeature('books', {}),
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
