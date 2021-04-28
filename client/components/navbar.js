import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import AddProducts from './AddProducts';
import AllProducts from './AllProducts';
import Cart from './Cart';
import AllUsers from './AllUsers';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }, props) => {
  console.log('Inside nav bar', props);
  return (
    <div>
      <nav>
        {isAdmin ? (
          <div>
            <Link to='/users' component={AllUsers}>
              Users
            </Link>
            <Link to='/home'>Home</Link>
            <a href='#' onClick={handleClick}>
              Logout
            </a>
            <Link to='/products/user/cart' component={Cart}>
              <span className='cart-count'>Cart</span>
            </Link>
            <Link to='/products' component={AddProducts}>
              Add Products
            </Link>
          </div>
        ) : isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to='/home'>Home</Link>
            <a href='#' onClick={handleClick}>
              Logout
            </a>
            <Link to='/products/user/cart' component={Cart}>
              <span className='cart-count'>Cart</span>
            </Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
            <Link to='/home'>Home</Link>
            <Link to='/cart' component={Cart}>
              <span className='cart-count'>5</span>
            </Link>
            {/* <span className="material-icons add-cart-img">shopping_cart</span> */}
          </div>
        )}
      </nav>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
