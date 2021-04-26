import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import singleProductReducer from './singleProduct';
import productsReducer from './products';
import cartReducer from './cart';
import usersReducer from './users';

const reducer = combineReducers({
  auth,
  products: productsReducer,
  singleProduct: singleProductReducer,
  cart: cartReducer,
  users: usersReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

console.log(store.getState(), 'store')
export default store;
export * from './auth';
