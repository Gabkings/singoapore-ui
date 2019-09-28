import { fromJS } from 'immutable';
import { MODEL_MAP, SEO } from '../actions/restApi';
import { getActionModel } from '../actions/apiUtil';

export const SEO_VIEW = 'seo';

const initialState = fromJS({
  [SEO.MODEL]: {
    LIST: {
      count: -1,
      next: 'http://localhost:8000/api/listings/?limit=10&offset=10',
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
  },
});

export default function modelReducer(state = initialState, action) {
  const model = getActionModel(action.type);
  if (model !== SEO.MODEL) {
    return state;
  }
  const updated = state.toJS();
  switch (action.type) {
    case MODEL_MAP[model].LIST.SUCCESS:
      updated[model].LIST = action.payload;
      return state.merge(updated);
    case MODEL_MAP[model].GET.SUCCESS:
    case MODEL_MAP[model].PUT.SUCCESS:
    case MODEL_MAP[model].PATCH.SUCCESS:
      updated[model].GET = action.payload;
      updated[model].LIST.results = updated[model].LIST.results.map(m => {
        if (m.id === action.payload.id) {
          return action.payload;
        }
        return m;
      });
      return state.merge(updated);
    case MODEL_MAP[model].POST.SUCCESS:
      updated[model].POST = action.payload;
      return state.merge(updated);
    case MODEL_MAP[model].DELETE.SUCCESS:
      updated[model].DELETE = action.payload;
      return state.merge(updated);
    default:
      return state;
  }
}
