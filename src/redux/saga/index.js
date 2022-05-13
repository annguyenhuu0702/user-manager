import {
  fork,
  take,
  call,
  put,
  takeLatest,
  takeEvery,
  all,
} from "redux-saga/effects";
import {
  fetchListUserSuccess,
  addUserSuccess,
  hideModal,
  editUserSuccess,
  deleteUserSuccess,
  fetchTotalPageSuccess,
  fetchTotalPage,
  fetchListUser,
} from "../actions/index";
import * as actionType from "../../constants/index";
import * as userApi from "../../apis/user";

// function* fetchListUser({ payload }) {
//   console.log(payload);
//   while (true) {
//     yield take(actionType.FETCH_LISTS);
//     const res = yield call(userApi.getAllUser, payload);
//     const { data, status } = res;
//     if (status === actionType.STATUS_CODE.SUCCESS) {
//       yield put(fetchListUserSuccess(data));
//     }
//   }
// }

function* fetchListUserSaga({ payload }) {
  const { page, limit } = payload;
  const res = yield call(userApi.getUsers, page, limit);
  const { data, status } = res;
  if (status === actionType.STATUS_CODE.SUCCESS) {
    yield put(fetchListUserSuccess(data));
  }
}

function* fetchTotalPageSaga({ payload }) {
  const { limit } = payload;
  const res = yield call(userApi.getAllUser);
  const { data, status } = res;
  if (status === actionType.STATUS_CODE.SUCCESS) {
    yield put(fetchTotalPageSuccess({ data, limit }));
  }
}

function* addUserSaga({ payload }) {
  const { user, page, limit } = payload;
  const res = yield call(userApi.addUser, user);
  const { data, status } = res;
  if (status === actionType.STATUS_CODE.CREATED) {
    yield put(addUserSuccess(data));
    yield put(hideModal());
    yield put(fetchTotalPage({ limit }));
    yield put(fetchListUser({ limit, page }));
  }
}

function* editUserSaga({ payload }) {
  const res = yield call(userApi.updateUser, payload);
  const { data, status } = res;
  if (status === actionType.STATUS_CODE.SUCCESS) {
    yield put(editUserSuccess(data));
    yield put(hideModal());
  }
}

function* onDeleteUser() {
  yield takeEvery(actionType.DELETE_USER, onDeleteUserSaga);
}

function* onDeleteUserSaga({ payload }) {
  const { id, page, limit } = payload;

  const res = yield call(userApi.deleteUser, id);
  const { status } = res;
  if (status === actionType.STATUS_CODE.SUCCESS) {
    yield put(deleteUserSuccess(id));
    yield put(fetchTotalPage({ limit }));
    yield put(fetchListUser({ limit, page }));
  }
}

// function* deleteUserSaga({ payload }) {
//   const res = yield call(userApi.deleteUser, payload);
//   const { status } = res;
//   if (status === actionType.STATUS_CODE.SUCCESS) {
//     yield put(deleteUserSuccess(payload));
//   }
// }

function* rootSaga() {
  // yield fork(fetchListUser);
  yield takeEvery(actionType.FETCH_LISTS, fetchListUserSaga);
  yield takeEvery(actionType.FETCH_TOTAL_PAGE, fetchTotalPageSaga);

  yield takeEvery(actionType.ADD_USER, addUserSaga);
  yield takeLatest(actionType.EDIT_USER, editUserSaga);
  // yield takeLatest(actionType.DELETE_USER, deleteUserSaga);
  yield all([call(onDeleteUser)]);
}

export default rootSaga;
