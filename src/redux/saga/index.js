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
} from "../actions/index";
import * as actionType from "../../constants/index";
import * as userApi from "../../apis/user";

function* fetchListUser() {
  while (true) {
    yield take(actionType.FETCH_LISTS);
    const res = yield call(userApi.getAllUser);
    const { data, status } = res;
    if (status === actionType.STATUS_CODE.SUCCESS) {
      yield put(fetchListUserSuccess(data));
    }
  }
}

function* addUserSaga({ payload }) {
  const res = yield call(userApi.addUser, payload);
  const { data, status } = res;
  if (status === actionType.STATUS_CODE.CREATED) {
    yield put(addUserSuccess(data));
    yield put(hideModal());
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
  const res = yield call(userApi.deleteUser, payload);
  const { status } = res;
  if (status === actionType.STATUS_CODE.SUCCESS) {
    yield put(deleteUserSuccess(payload));
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
  yield fork(fetchListUser);
  yield takeEvery(actionType.ADD_USER, addUserSaga);
  yield takeLatest(actionType.EDIT_USER, editUserSaga);
  // yield takeLatest(actionType.DELETE_USER, deleteUserSaga);
  yield all([call(onDeleteUser)]);
}

export default rootSaga;
