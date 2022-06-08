import { AUTH, LOGOUT, GETSTATE } from "../constants/actionTypes";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action?.data));
      return { ...state, ...action?.data };
    case LOGOUT:
      localStorage.clear();
      return {};
    case GETSTATE:
      return { ...state, ...JSON.parse(localStorage.getItem("profile")) };
    default:
      return state;
  }
};

export default authReducer;
