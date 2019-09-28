import { call, put, takeLatest } from 'redux-saga/effects';
import { wpGet, WP_POSTS, WP_CATEGORIES } from '../actions/wpApi';
import { APPLICATION_JSON } from '../utils/actionsUtil';
import { getActionApi } from '../actions/apiUtil';

function* fetchPosts(action) {
  if (action.type === WP_POSTS.LIST.REQUESTED) {
    try {
      const response = yield call(wpGet, {
        model: WP_POSTS.MODEL,
        contentType: APPLICATION_JSON,
        query: action.payload.query,
      });
      if (response.error) {
        yield put({
          type: WP_POSTS.LIST.FAILED,
          payload:
            (response.error.response && response.error.response.data.msg) ||
            'Network Error',
        });
        return;
      }
      yield put({
        type: WP_POSTS.LIST.SUCCESS,
        payload: {
          posts: response.data,
          total: response.headers['x-wp-total'],
          query: action.payload.query,
        },
        view: action.view,
      });
    } catch (e) {
      yield put({ type: WP_POSTS.LIST.FAILED, payload: e.message });
    }
  }

  if (action.type === WP_POSTS.GET.REQUESTED) {
    try {
      const response = yield call(wpGet, {
        model: WP_POSTS.MODEL,
        contentType: APPLICATION_JSON,
        query: action.payload.query,
      });
      if (response.error) {
        yield put({
          type: WP_POSTS.GET.FAILED,
          payload:
            (response.error.response && response.error.response.data.msg) ||
            'Network Error',
        });
        return;
      }
      yield put({
        type: WP_POSTS.GET.SUCCESS,
        payload: {
          post: response.data[0],
        },
        view: action.view,
      });
    } catch (e) {
      yield put({ type: WP_POSTS.GET.FAILED, payload: e.message });
    }
  }
}

function* fetchRelatedPosts(action) {
  const actionApi = getActionApi(action.type);
  try {
    const response = yield call(wpGet, {
      model: WP_POSTS.MODEL,
      contentType: APPLICATION_JSON,
      query: action.payload.query,
    });
    if (response.error) {
      yield put({
        type: WP_POSTS[actionApi].FAILED,
        payload:
          (response.error.response && response.error.response.data.msg) ||
          'Network Error',
      });
      return;
    }
    yield put({
      type: WP_POSTS[actionApi].SUCCESS,
      payload: {
        relatedPosts: response.data,
      },
      view: action.view,
    });
  } catch (e) {
    yield put({ type: WP_POSTS[actionApi].FAILED, payload: e.message });
  }
}

function* fetchCategories(action) {
  if (action.type === WP_CATEGORIES.LIST.REQUESTED) {
    try {
      const response = yield call(wpGet, {
        model: WP_CATEGORIES.MODEL,
        contentType: APPLICATION_JSON,
        query: action.payload.query,
      });
      if (response.error) {
        yield put({
          type: WP_CATEGORIES.LIST.FAILED,
          payload:
            (response.error.response && response.error.response.data.msg) ||
            'Network Error',
        });
        return;
      }
      yield put({
        type: WP_CATEGORIES.LIST.SUCCESS,
        payload: {
          categories: response.data.map(data => ({
            id: data.id,
            slug: data.slug,
            name: data.name,
          })),
        },
        view: action.view,
      });
    } catch (e) {
      yield put({ type: WP_CATEGORIES.LIST.FAILED, payload: e.message });
    }
  }
}

function* blogSaga() {
  yield [
    takeLatest(WP_POSTS.GET.REQUESTED, fetchPosts),
    takeLatest(WP_POSTS.LIST.REQUESTED, fetchPosts),
    takeLatest(WP_CATEGORIES.LIST.REQUESTED, fetchCategories),
    takeLatest(WP_POSTS.RELATED_BY_TAG.REQUESTED, fetchRelatedPosts),
    takeLatest(WP_POSTS.RELATED_BY_CATEGORY.REQUESTED, fetchRelatedPosts),
    takeLatest(WP_POSTS.RELATED_BY_SLUG.REQUESTED, fetchRelatedPosts),
  ];
}

export default blogSaga;
