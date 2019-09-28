import { IS_FETCHING } from '../sagas/isfetching';

export const FETCHING_VIEW = 'fetching_view';

// Initial routing state
const initialState = 0;

/**
 * Merge route into the global application state
 */
export default function isFetchingReducer(state = initialState, action) {
  switch (action.type) {
    case IS_FETCHING.ADD_SPINNER:
      return state + 1;
    case IS_FETCHING.REMOVE_SPINNER:
      return Math.max(state - 1, 0);
    default:
      return state;
  }
}
