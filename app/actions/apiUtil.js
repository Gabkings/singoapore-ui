export function getActionModel(actionType) {
  return actionType.split('/')[0];
}

export function getActionApi(actionType) {
  return actionType.split('/')[1];
}

export function getActionStatus(actionType) {
  return actionType.split('/')[2];
}

export function generateApiActions(model, api) {
  return {
    REQUESTED: `${model}/${api}/REQUESTED`,
    SUCCESS: `${model}/${api}/SUCCESS`,
    FAILED: `${model}/${api}/FAILED`,
  };
}

export function generateRestActions(model) {
  return {
    GET: generateApiActions(model, 'GET'),
    LIST: generateApiActions(model, 'LIST'),
    POST: generateApiActions(model, 'POST'),
    PATCH: generateApiActions(model, 'PATCH'),
    PUT: generateApiActions(model, 'PUT'),
    DELETE: generateApiActions(model, 'DELETE'),
  };
}

export const generateModelMap = modelList => {
  const m = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const model of modelList) {
    m[model.MODEL] = model;
  }
  return m;
};
