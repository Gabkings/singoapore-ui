import { fromJS } from 'immutable';
import {
  CATEGORIES,
  getActionModel,
  LISTINGS,
  MODEL_MAP,
} from '../actions/restApi';
import { DIRECTORY_VIEW } from '../containers/DirectoryPage/DirectoryPage';
import { SERVICES_VIEW } from '../containers/ServicesPage/ServicesPage';

function generateDefaultStore() {
  return {
    LIST: {},
    GET: {},
    POST: {},
  };
}

const initialState = fromJS({
  [DIRECTORY_VIEW]: {
    [LISTINGS.MODEL]: generateDefaultStore(),
  },
  [SERVICES_VIEW]: {
    [CATEGORIES.MODEL]: generateDefaultStore(),
  },
});

export default function modelReducer(state = initialState, action) {
  const model = getActionModel(action.type);
  switch (action.type) {
    case MODEL_MAP[model].LIST.SUCCESS:
      return state.merge({
        [action.view]: {
          [model]: {
            LIST: action.payload,
          },
        },
      });
    case MODEL_MAP[model].GET.SUCCESS:
    case MODEL_MAP[model].PUT.SUCCESS:
    case MODEL_MAP[model].PATCH.SUCCESS:
      return state.merge({
        [action.view]: {
          [model]: {
            GET: action.payload,
          },
        },
      });
    case MODEL_MAP[model].POST.SUCCESS:
      return state.merge({
        [action.view]: {
          [model]: {
            POST: action.payload,
          },
        },
      });
    default:
      return state;
  }
}
