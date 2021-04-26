import axios from 'axios';

const GET_PRODUCT = 'GET_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

const getProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product,
  };
};

const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
};

const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      console.log('Inside Fetch Single Product', id);
      const { data } = await axios.get(`/api/products/${id}`);
      console.log('Data return from fetchSingleProduct', data);
      dispatch(getProduct(data));
    } catch (error) {
      console.log('There was an error with Fetching Single Product', error);
    }
  };
};

export const fetchUpdateProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/products/${product.id}`, product);
      dispatch(updateProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchDeleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/products/${id}`);
      dispatch(deleteProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {};

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      console.log('Inside Reducer Single Produce');
      return action.product;
    case UPDATE_PRODUCT:
      return action.product;
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
}
