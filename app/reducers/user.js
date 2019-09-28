import { fromJS } from 'immutable';
import { CONSUMERS, USERS } from '../actions/restApi';
import { getToken } from '../utils/localStorage';

import { CONTACT_VIEW } from '../containers/ContactPage/constant';

// Initial routing state
const initialState = fromJS({
  user: {},
  LOAD_AUTH: {
    data: {
      merchantId: -1,
      userId: -1,
      consumerId: -1,
    },
  },
  loginError: {},
  // initialize based on whether token exists in localStorage
  // LOAD_AUTH will be called on every page load by AuthRoute,
  // and will change this if token is invalid
  isLoggedIn: !!getToken(),
  LOGIN: {},
  REGISTER: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  PASSWORD_RESET_EMAIL: {},
  PASSWORD_RESET_SUBMIT: {},
  [CONSUMERS.MODEL]: {},
});

/**
 * Merge route into the global application state
 */
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case USERS.REGISTER.SUCCESS:
      return state.merge({
        REGISTER: action.payload,
      });
    case USERS.REGISTER.FAILED:
      return state.merge({
        loginError: action.payload,
      });
    case USERS.REGISTER.REQUESTED:
    case USERS.LOGIN.REQUESTED:
      return state.merge({
        loginError: {},
      });
    case USERS.LOGIN.SUCCESS:
      return state.merge({
        LOGIN: action.payload,
        isLoggedIn: true,
      });
    case USERS.LOGIN.FAILED:
      return state.merge({
        loginError: action.payload,
        isLoggedIn: false,
      });
    case USERS.ACTIVATE.FAILED:
      return state.merge({
        ACTIVATE: action.payload,
      });
    case USERS.DEACTIVATE.FAILED:
      return state.merge({
        DEACTIVATE: action.payload,
      });
    case USERS.PASSWORD_RESET_EMAIL.REQUESTED:
      return state.merge({
        PASSWORD_RESET_EMAIL: {},
      });
    case USERS.PASSWORD_RESET_EMAIL.SUCCESS:
      return state.merge({
        PASSWORD_RESET_EMAIL: action.payload,
      });
    case USERS.PASSWORD_RESET_EMAIL.FAILED:
      return state.merge({
        PASSWORD_RESET_EMAIL: { error: action.payload.message },
      });
    case USERS.PASSWORD_RESET_SUBMIT.SUCCESS:
      return state.merge({
        PASSWORD_RESET_SUBMIT: action.payload,
      });
    case USERS.GET.SUCCESS:
      return state.merge({
        user: action.payload,
      });
    case USERS.POST.SUCCESS:
      if (action.view === CONTACT_VIEW) {
        return state.merge({
          contact: action.payload,
        });
      }
      return state;
    case USERS.PATCH.SUCCESS:
      return state.merge({
        user: action.payload,
      });
    case USERS.LOAD_AUTH.SUCCESS:
      return state.merge({
        LOAD_AUTH: action.payload,
        isLoggedIn: true,
      });
    case USERS.LOAD_AUTH.FAILED:
      return state.merge({
        loginError: action.payload,
        isLoggedIn: false,
      });
    case USERS.LOGOUT.SUCCESS:
      return state.merge({
        user: {},
        LOAD_AUTH: {
          data: {
            merchantId: 0,
            userId: 0,
            consumerId: 0,
          },
        },
        loginError: {},
        isLoggedIn: false,
      });
    case CONSUMERS.GET.SUCCESS:
      return state.merge({
        [CONSUMERS.MODEL]: action.payload,
      });
    case CONSUMERS.POST.SUCCESS:
      return state.merge({
        [CONSUMERS.MODEL]: action.payload,
      });
    default:
      return state;
  }
}
