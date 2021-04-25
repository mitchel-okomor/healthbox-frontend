import {
  SET_CART,
  SET_LOADING,
  SET_USER,
  SET_PRESCRIPTIONS,
  SET_USER_ORDERS,
  SET_MESSAGE,
} from "../helpers/constant";

export const initialState = {
  user: null,
  prescriptions: [],
  ticketEvents: [],
  cart: [],
  orders: [],
  message: {
    type: "",
    content: "",
  },
  loading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case SET_PRESCRIPTIONS:
      return {
        ...state,
        prescriptions: action.payload,
      };

    case SET_USER_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    default:
  }

  return state;
};
