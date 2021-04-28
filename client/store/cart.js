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
        console.log(token, 'token')
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

        //localStorage.removeItem("cart");
        let cart = JSON.parse(localStorage.getItem("cart"));

        if (cart) {
          let seen = false;
          console.log("For Loop Cart", cart)
          for (let i = 0; i < cart.length; i++) {
            if (cart[i].product.id === Number(id)) {
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
        dispatch(getCart(JSON.parse(localStorage.getItem("cart"))));
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
        let cart = JSON.parse(localStorage.getItem("cart"));
        dispatch(getCart(cart));
      }
    } catch (error) {
      console.log("Error in Fetch Add Product", error);
    }
  };
};

const CLEAR_CART = "CLEAR_CART"

const clearCart = () => {
  return {
    type: CLEAR_CART,
    cart: []
  }
}



export const fetchCheckout = (userInfo) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      console.log("Token in Fetch Checkout", token)
      if (token) {
        const { data } = await axios.put(`/api/products/user/checkout`, {
          headers: {
            authorization: token,
          }
        });
        dispatch(clearCart(data));
      } else {
        let cart = JSON.parse(localStorage.getItem("cart"));
        // await axios.post("/api/products/guest/checkout", {cart, userInfo})
        localStorage.removeItem("cart");
        dispatch(clearCart());
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
    case CLEAR_CART:
      console.log(action.cart)
      return action.cart
    default:
      return state;
  }
}
