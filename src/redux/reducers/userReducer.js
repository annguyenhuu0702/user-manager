import * as actionType from "../../constants/index";

const initialState = {
  listUser: [],
  userEdit: null,
  allUser: {
    items: [],
    limit: 5,
    page: 1,
  },
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_LISTS: {
      return state;
    }
    case actionType.FETCH_LISTS_SUCCESS: {
      return { ...state, listUser: action.payload };
    }
    case actionType.FETCH_TOTAL_PAGE: {
      return state;
    }
    case actionType.FETCH_TOTAL_PAGE_SUCCESS: {
      const { data, limit } = action.payload;
      return {
        ...state,
        allUser: {
          ...state.allUser,
          limit,
          items: data,
        },
      };
    }
    case actionType.CHANGE_PAGE: {
      return {
        ...state,
        allUser: { ...state.allUser, page: action.payload },
      };
    }
    case actionType.ADD_USER:
      return state;

    case actionType.ADD_USER_SUCCESS:
      return state;
    case actionType.SET_USER_EDITING:
      return {
        ...state,
        userEdit: action.payload,
      };

    case actionType.EDIT_USER:
      return state;

    case actionType.EDIT_USER_SUCCESS:
      const data = action.payload;
      const { listUser } = state;
      const index = listUser.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        const newListUser = [
          ...listUser.slice(0, index),
          data,
          ...listUser.slice(index + 1, listUser.length),
        ];
        return {
          ...state,
          listUser: newListUser,
        };
      }
      return {
        ...state,
      };

    case actionType.DELETE_USER:
      return state;

    case actionType.DELETE_USER_SUCCESS:
      let newPage = state.allUser.page;
      if (newPage !== 1 && (state.allUser.items.length - 1) % 5 === 0) {
        newPage--;
      }
      return {
        ...state,
        allUser: { ...state.allUser, page: newPage },
      };
    default:
      return state;
  }
};
export default userReducer;
