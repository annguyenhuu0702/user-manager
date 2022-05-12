import * as actionType from "../../constants/index";

const initialState = {
  listUser: [],
  userEdit: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_LISTS_SUCCESS: {
      return { ...state, listUser: action.payload };
    }
    case actionType.ADD_USER_SUCCESS:
      return {
        ...state,
        listUser: state.listUser.concat([action.payload]),
      };
    case actionType.SET_USER_EDITING:
      return {
        ...state,
        userEdit: action.payload,
      };

    case actionType.DELETE_USER_SUCCESS:
      state.listUser = state.listUser.filter(
        (item) => item.id !== action.payload
      );
      return { ...state };
    default:
      return state;
  }
};
export default userReducer;
