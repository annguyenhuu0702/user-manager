import * as actionType from "../../constants/index";

export const addUser = (user) => {
  return {
    type: actionType.ADD_USER,
    payload: user,
  };
};

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

export const editUser = (user, userId) => {
  return {
    type: actionType.EDIT_USER,
    payload: { user, userId },
  };
};

export const editUserSuccess = (user, userId) => {
  return {
    type: actionType.EDIT_USER_SUCCESS,
    payload: { user, userId },
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
