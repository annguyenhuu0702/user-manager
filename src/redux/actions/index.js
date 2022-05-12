import * as actionType from "../../constants/index";

export const addUserSuccess = (user) => {
  return {
    type: actionType.ADD_USER_SUCCESS,
    payload: user,
  };
};

export const setUserEditing = (user) => {
  return {
    type: actionType.SET_USER_EDITING,
    payload: user,
  };
};

export const editUserSuccess = (user) => {
  return {
    type: actionType.EDIT_USER_SUCCESS,
    payload: user,
  };
};

export const deleteUserSuccess = (id) => {
  return {
    type: actionType.DELETE_USER_SUCCESS,
    payload: id,
  };
};

export const fetchListUserSuccess = (data) => {
  return {
    type: actionType.FETCH_LISTS_SUCCESS,
    payload: data,
  };
};

export const showModal = () => {
  return {
    type: actionType.SHOW_MODAL,
  };
};

export const hideModal = () => {
  return {
    type: actionType.HIDE_MODAL,
  };
};

export const changeModalContent = (title) => {
  return {
    type: actionType.CHANGE_MODAL_CONTENT,
    payload: title,
  };
};

export const changeModalTitle = (component) => {
  return {
    type: actionType.CHANGE_MODAL_TITLE,
    payload: component,
  };
};

export const addUserSaga = (user) => {
  return {
    type: "ADD_USER_SAGA",
    payload: user,
  };
};

export const editUserSaga = (user) => {
  return {
    type: "EDIT_USER_SAGA",
    payload: user,
  };
};

export const deleteUserSaga = (user) => {
  return {
    type: actionType.DELETE_USER_SUCCESS,
    payload: user,
  };
};
