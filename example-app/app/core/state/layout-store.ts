import { Injectable } from '@angular/core';
import { AppStore } from 'ng-app-state';
import { LayoutState } from './layout-state';
import { Store } from '@ngrx/store';

@Injectable()
export class LayoutStore extends AppStore<LayoutState> {
  constructor(store: Store<any>) {
    super(store, 'layout', new LayoutState());
  }
}
