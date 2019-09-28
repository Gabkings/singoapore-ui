import { fromJS } from 'immutable';
import { isEqual } from 'lodash';
import { USERS, MODEL_MAP } from '../actions/restApi';
import { getActionModel } from '../actions/apiUtil';

const initialState = fromJS({
  [USERS.MODEL]: {},
});

export const HOMEMATCH_VIEW = 'homeMatch';

export default function homeMatchReducer(state = initialState, action) {
  if (!isEqual(action.view, HOMEMATCH_VIEW)) return state;

  const model = getActionModel(action.type);
  switch (action.type) {
    case MODEL_MAP[model].POST.REQUESTED:
      return state.merge({
        [model]: { ...action.payload, requesting: true },
      });
    case MODEL_MAP[model].POST.SUCCESS:
      return state.merge({
        [model]: { ...action.payload, requesting: false },
      });
    case MODEL_MAP[model].POST.FAILED:
      return state.merge({
        [model]: { ...action.payload, requesting: false },
      });
    default:
      return state;
  }
}
