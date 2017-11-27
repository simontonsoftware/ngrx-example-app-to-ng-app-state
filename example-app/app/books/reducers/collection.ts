export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
};

export function reducer(state = initialState, action: any): State {
  return state;
}

export const getLoaded = (state: State) => state.loaded;
