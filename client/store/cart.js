import axios from "axios";

const TOKEN = "token";

const GET_CART = "GET_CART";

const getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

const ADD_PRODUCT = "ADD_PRODUCT";

const addProduct = (productOrder) => {
  return {
    type: ADD_PRODUCT,
    productOrder,
  };
};

export const fetchAddProduct = (id, quantity, price, product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.put(
          `/api/products/cart/add_product/${id}`,
          {
            headers: {
              authorization: token,
            },
            orderDetails: {
              quantity: quantity,
              priceSnapshot: price,
            },
          }
        );
        dispatch(addProduct(data));
      } else {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart) {
          let seen = false;
          for (let i = 0; i < cart.length; i++) {
            if (cart[i].product.id === id) {
              cart[i].quantity = quantity + cart[i].quantity;
              seen = true;
            }
          }
          if (!seen) {
            cart.push({ product, quantity, price });
            seen = false;
          }
          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          cart = [];
          cart.push({ product, quantity, price });
          localStorage.setItem("cart", JSON.stringify(cart));
        }
        dispatch(getCart(cart));
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
        const { data } = await axios.get(`/api/products/user/cart`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(getCart(data));
      } else {
        let cart = localStorage.getItem("cart");
        dispatch(getCart(cart));
      }
    } catch (error) {
      console.log("Error in Fetch Add Product", error);
    }
  };
};

export const fetchCheckout = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.get(`/api/products/user/cart/checkout`, {
          headers: {
            authorization: token,
          },
        });
        //dispatch(clear(data));
      } else {
        let cart = localStorage.getItem("cart");
        const { data } = await axios.put(`/api/products/guest/checkout`, { cart });
        localStorage.removeItem("cart");
        //dispatch(clear(data));
      }
    } catch (error) {
      console.log("Error in Fetch Add Product", error);
    }
  };
};

const initialState = [];

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_PRODUCT:
      let newState = state.filter((productOrder) => {
        if (productOrder.id === action.productOrder.id) {
          return action.productOrder;
        } else {
          productOrder;
        }
      });
      if (newState.length < state.length) {
        newState.push(action.productOrder);
      }
      return newState;
    default:
      return state;
  }
}
