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
        console.log("Inside Else Statement", cart)
        if (cart) {
          let seen = false;
          for (let i = 0; i < cart.length; i++) {
            if (cart[i].product.id === id) {
              console.log("For Loop Cart", cart[i])
              cart[i].quantity = quantity + cart[i].quantity;
              seen = true;
            }
          }
          if (!seen) {
            console.log("Line 57")
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
      if(state.length > 0){
        let idFound = false;
        let newState = state.map((productOrder) => {
          if (productOrder.id === action.productOrder.id) {
            idFound = true;
            return action.productOrder;
          } else {
            return productOrder;
          }
        });
        if (!idFound) {
          newState.push(action.productOrder);
        }
        return newState;
      } else {
        return [...state, action.productOrder]
      }
    default:
      return state;
  }
}
