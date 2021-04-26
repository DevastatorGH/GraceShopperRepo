import axios from "axios";

const TOKEN = "token";

const GET_CART = "GET_CART";

const getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};


export const fetchAddProduct = (id, quantity, price) => {
  return async (dispatch) => {
   //localStorage.removeItem('cart')
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
          let seen = false;
          for (let i = 0; i < cart.length; i++) {
            if (cart[i][`${id}`]) {
              cart[i][`${id}`] = quantity + cart[i][`${id}`];
              seen = true;
            } 
          }
          if(!seen){
              let obj = {};
              obj[`${id}`] = quantity;
              cart.push(obj);
            seen = false
          }
          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          let cart = [];
          let obj = {};
          obj[`${id}`] = quantity;
          cart.push(obj);
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
      console.log(token);
      if (token) {
        const { data } = await axios.put(`/api/user/cart`);
        dispatch(getCart(data));
      } else {
      let cart = localStorage.getItem("cart");
      console.log(cart, "cart");
      const { data } = await axios.get(`/api/products/guest/${cart}`);
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
