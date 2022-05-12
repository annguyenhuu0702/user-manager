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
    case actionType.ADD_USER:
      return {
        ...state,
      };
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

    case actionType.EDIT_USER:
      return {
        ...state,
      };

    case actionType.EDIT_USER_SUCCESS:
      const { data } = action.payload;

      const { listUser } = state;
      const index = listUser.findIndex((item) => item.id === data);
      if (index !== -1) {
      } else {
        const newListUser = [
          ...listUser.slice(0, index),
          data,
          ...listUser.slice(0, index + 1),
        ];
        return {
          ...state,
          listUser: newListUser,
        };
      }
      return {
        ...state,
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
