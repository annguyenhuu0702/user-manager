import * as actionType from "../../constants/index";

const initialState = {
  openModal: false,
  title: "",
  component: null,
};
const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SHOW_MODAL:
      return {
        ...state,
        openModal: true,
      };
    case actionType.HIDE_MODAL:
      return {
        ...state,
        openModal: false,
        title: "",
        component: null,
      };
    case actionType.CHANGE_MODAL_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case actionType.CHANGE_MODAL_CONTENT:
      return {
        ...state,
        component: action.payload,
      };
    default:
      return state;
  }
};
export default modalReducer;
