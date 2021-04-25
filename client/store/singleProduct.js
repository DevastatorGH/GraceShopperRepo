import axios from 'axios';

const GET_PRODUCT = 'GET_PRODUCT';

const getProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product,
  };
};

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      console.log("Inside Fetch Single Product", id)
      const { data } = await axios.get(`/api/products/${id}`);
      console.log("Data return from fetchSingleProduct", data)
      dispatch(getProduct(data));
    } catch (error) {
      console.log("There was an error with Fetching Single Product", error);
    }
  };
};

const initialState = {};

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      console.log("Inside Reducer Single Produce")
      return action.product;
    default:
      return state;
  }
}
