import axios from 'axios';

const TOKEN = 'token';
const GET_PRODUCT = 'GET_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

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

export const fetchUpdateProduct = (product, history) => {
  return async (dispatch) => {
    console.log('product:', product);
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.put(
          `/api/products/${product.id}`,
          product,
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(updateProduct(data));
      }
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
      console.log('inside reducer update product');
      return action.product;
    default:
      return state;
  }
}
