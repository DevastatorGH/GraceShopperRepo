import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/home';
import { me } from './store';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import AllUsers from './components/AllUsers';
import EditProduct from './components/EditProduct';
import AddProducts from './components/AddProducts';
import demoCheckout from './components/demoCheckout';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import CompletedOrder from './components/CompletedOrder';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    const isAdmin = this.props.isAdmin;
    console.log(isAdmin, 'admin');

    return (
      <div>
        {isAdmin ? (
          <div>
            <Route path='/home' component={AllProducts} />
            <Route path='/login' component={AllProducts} />
            <Route exact path='/products/user/cart' component={Cart} />
            <Route exact path='/products/:id' component={SingleProduct} />
            <Route exact path='/products/:id' component={EditProduct} />
            <Route path='/products' component={AddProducts} />
            <Route path='/products' component={AllProducts} />
            <Route path='/users' component={AllUsers} />
            <Route exact path='/completedOrder' component={CompletedOrder} />
            
          </div>
        ) : isLoggedIn ? (
          <div>
            <Route path='/home' component={AllProducts} />
            <Route path='/login' component={AllProducts} />
            <Route path='/signup' component={AllProducts} />
            <Route exact path='/products/user/cart' component={Cart} />
            <Route exact path='/products' component={AllProducts} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/products/:id' component={SingleProduct} />
            <Route exact path='/completedOrder' component={CompletedOrder} />
          </div>
        ) : (
          <div>
            <Route path='/' exact component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route exact path='/products' component={AllProducts} />
            <Route exact path='/products/guest/cart' component={Cart} />
            <Route exact path='/products/:id' component={SingleProduct} />
            <Route exact path='/form' component={Checkout} />
            <Route exact path='/completedOrder' component={CompletedOrder} /> 
          </div>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
