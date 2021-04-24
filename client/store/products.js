import axios from 'axios';

const SET_PRODUCTS = 'SET_PRODUCTS';

const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      console.log("Fetch Products ")
      const { data } = await axios.get('/api/products');
      console.log("Inside fetchProducts: data returned", data)
      dispatch(setProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
