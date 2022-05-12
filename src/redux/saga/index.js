import {
  fork,
  take,
  call,
  put,
  takeLatest,
  all,
  takeEvery,
  select,
} from "redux-saga/effects";
import {
  fetchListUserSuccess,
  addUserSuccess,
  hideModal,
} from "../actions/index";
import * as actionType from "../../constants/index";
import * as userApi from "../../apis/user";

function* watchFetchListUser() {
  while (true) {
    yield take(actionType.FETCH_LISTS_SUCCESS);
    const res = yield call(userApi.getAllUser);
    const { data, status } = res;
    if (status === actionType.STATUS_CODE.SUCCESS) {
      yield put(fetchListUserSuccess(data));
    }
  }
}

function* addUserSaga({ payload }) {
  const { name, sex, phoneNumber, address } = payload;
  const res = yield call(userApi.addUser, {
    name,
    sex,
    phoneNumber,
    address,
  });
  const { data, status } = res;
  if (status === actionType.STATUS_CODE.CREATED) {
    yield put(addUserSuccess(data));
    yield put(hideModal());
  }
}

function* editUserSaga({ payload }) {
  const { name, sex, phoneNumber, address } = payload;
}

function* rootSaga() {
  yield fork(watchFetchListUser);
  yield takeLatest(actionType.ADD_USER_SUCCESS, addUserSaga);
  yield takeLatest(actionType.EDIT_USER_SUCCESS, editUserSaga);
  // yield all([call(onDeleteUser)]);
}

export default rootSaga;
