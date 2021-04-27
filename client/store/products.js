import axios from 'axios';

const SET_PRODUCTS = 'SET_PRODUCTS';
const ADD_PRODUCTS = 'ADD_PRODUCTS';

const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

const _addProducts = (product) => {
  return {
    type: ADD_PRODUCTS,
    product,
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(setProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addProduct = (product, history) => {
  return async (dispatch) => {
    try {
      const { data: added } = await axios.post('/api/products', product);
      dispatch(_addProducts(added));
      history.push('/');
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
    case ADD_PRODUCTS:
      return [...state, action.product];
    default:
      return state;
  }
}
