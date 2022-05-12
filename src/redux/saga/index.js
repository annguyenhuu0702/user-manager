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
  editUserSuccess,
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
  const userEdit = yield select((state) => state.user.userEdit);
  const res = yield call(
    userApi.editUser,
    {
      name,
      sex,
      phoneNumber,
      address,
    },
    userEdit.id
  );
  const { data, status } = res;
  console.log(res);
  if (status === actionType.STATUS_CODE.UPDATED) {
    yield put(editUserSuccess(data));
    yield put(hideModal());
  }
}

function* rootSaga() {
  yield fork(watchFetchListUser);
  yield takeLatest(actionType.ADD_USER, addUserSaga);
  yield takeLatest(actionType.EDIT_USER, editUserSaga);
  // yield all([call(onDeleteUser)]);
}

export default rootSaga;
