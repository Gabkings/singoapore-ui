import { fromJS } from 'immutable';
import { MODEL_MAP } from '../actions/restApi';
import { getActionModel, getActionApi, getActionStatus } from '../actions/apiUtil';

function getInitialState(models) {
  const result = {};
  models.map(model => {
    const modelState = {};
    Object.keys(MODEL_MAP[model]).filter(key => key !== 'MODEL').forEach(action => {
      modelState[action] = {
        state: 'initial',
        data: {},
      }
    });
    return {
      modelName: model,
      modelState,
    }
  }).forEach(({modelName, modelState}) => {
    result[modelName] = modelState;
  });
  return result
}


export default function ReducerFactory(view, models){
  const initialState = fromJS(getInitialState(models));

  const reducer = (state = initialState, action) => {
    if (action.view !== view) {
      return state;
    }
    const model = getActionModel(action.type);
    const modelAction = getActionApi(action.type);
    const modelActionState = getActionStatus(action.type);
    switch (action.type) {
      case `${model}/${modelAction}/${modelActionState}`:
        return state.setIn([model, modelAction], {
          state: modelActionState,
          data: action.payload,
        });
      default:
        return state;
    }
  };
  return { initialState, reducer }
}
