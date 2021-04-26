import axios from "axios";

const TOKEN = "token";

// action creator
const GET_CART = "GET_CART";

const getCart = (cart) => {
    return {
        type: GET_CART,
        cart
    }
}

//in component maybe? no action happens
export const fetchAddProduct = (id, quantity, price) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.put(`/api/products/${id}`, {
          quantity,
          priceSnapshot: price,
        });
      } else {
        if (localStorage.getItem("cart")) {
          let cart = JSON.parse(localStorage.getItem("cart"));
          cart[`${id}`] = quantity;
          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          let cart = [];
          cart[`${id}`] = quantity;
          // "[{1: 4}, {3:1}]"
          localStorage.setItem("cart", JSON.stringify(cart)); // take array stringify it and set it on local storage
        }
      }
    } catch (error) {
      console.log("Error in Fetch Add Product", error);
    }
  };
};

export const fetchGetCart = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.put(`/api/user/cart}`);
        dispatch(getCart(data));
      } else {
        let cart = JSON.parse(localStorage.getItem("cart"));
        const { data } = await axios.put(`/api/guest/cart}`, {cart});
        dispatch(getCart(data));
      }
    } catch (error) {
      console.log("Error in Fetch Add Product", error);
    }
  };
};

const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}
