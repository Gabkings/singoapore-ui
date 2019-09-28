import { fromJS } from 'immutable';
import { LISTINGS, MODEL_MAP } from '../actions/restApi';
import { getActionModel } from '../actions/apiUtil';

const initialState = fromJS({
  [LISTINGS.MODEL]: {
    LIST: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
  },
});

export default function modelReducer(state = initialState, action) {
  const model = getActionModel(action.type);
  if (model !== LISTINGS.MODEL) {
    return state;
  }
  switch (action.type) {
    case MODEL_MAP[model].LIST.REQUESTED:
      return state.merge({
        [model]: {
          LIST: {
            count: 0,
            next: null,
            previous: null,
            results: [],
            requesting: true,
          },
        },
      });
    case MODEL_MAP[model].LIST.SUCCESS:
      return state.merge({
        [model]: {
          LIST: {
            ...state.toJS()[LISTINGS.MODEL].LIST,
            ...action.payload,
            requesting: false,
          },
        },
      });
    case MODEL_MAP[model].LIST.FAILED:
      return state.merge({
        [model]: {
          LIST: {
            ...state.toJS()[LISTINGS.MODEL].LIST,
            ...action.payload,
            requesting: false,
          },
        },
      });
    case MODEL_MAP[model].GET.SUCCESS:
    case MODEL_MAP[model].PUT.SUCCESS:
    case MODEL_MAP[model].PATCH.SUCCESS:
      return state.merge({
        [model]: {
          GET: action.payload,
        },
      });
    case MODEL_MAP[model].POST.SUCCESS:
      return state.merge({
        [model]: {
          POST: action.payload,
        },
      });
    default:
      return state;
  }
}
