import * as auth from '../actions/auth';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
