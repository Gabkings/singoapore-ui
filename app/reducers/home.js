import { fromJS } from 'immutable';
import { isEqual } from 'lodash';
import { GALLERIES, MODEL_MAP, REVIEWS } from '../actions/restApi';
import categories from '../containers/Common/categories.json';
import { getActionModel } from '../actions/apiUtil';

const initialState = fromJS({
  [GALLERIES.MODEL]: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  [REVIEWS.MODEL]: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  categories,
});

export const HOME_VIEW = 'home';

export default function galleryReducer(state = initialState, action) {
  if (!isEqual(action.view, HOME_VIEW)) return state;
  const model = getActionModel(action.type);
  switch (action.type) {
    case MODEL_MAP[model].LIST.SUCCESS:
      return state.merge({
        [model]: action.payload,
      });
    default:
      return state;
  }
}
