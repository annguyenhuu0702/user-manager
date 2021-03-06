import * as actionType from "../../constants/index";

export const fetchListUser = (data) => {
  return {
    type: actionType.FETCH_LISTS,
    payload: data,
  };
};

export const fetchListUserSuccess = (data) => {
  return {
    type: actionType.FETCH_LISTS_SUCCESS,
    payload: data,
  };
};

export const fetchTotalPage = (data) => {
  return {
    type: actionType.FETCH_TOTAL_PAGE,
    payload: data,
  };
};

export const fetchTotalPageSuccess = (data) => {
  return {
    type: actionType.FETCH_TOTAL_PAGE_SUCCESS,
    payload: data,
  };
};

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

export const editUser = (user) => {
  return {
    type: actionType.EDIT_USER,
    payload: user,
  };
};

export const editUserSuccess = (user) => {
  return {
    type: actionType.EDIT_USER_SUCCESS,
    payload: user,
  };
};

export const deleteUser = (id) => {
  return {
    type: actionType.DELETE_USER,
    payload: id,
  };
};

export const deleteUserSuccess = (id) => {
  return {
    type: actionType.DELETE_USER_SUCCESS,
    payload: id,
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

export const changePage = (page) => {
  return {
    type: "CHANGE_PAGE",
    payload: page,
  };
};
