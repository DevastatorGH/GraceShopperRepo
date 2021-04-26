import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AllProducts from "./AllProducts"
import AddCartItems from "./AddCartItems"


const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand">NavbarBrand</a>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (

        <div className="collapse navbar-collapse">

        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/products">Products</Link>
        <div>Cart:</div>

          {/* The navbar will show these links before you log in */}
          {/* <ul className="navbar-nav mr-auto">
            <li className="nav-item active"><Link to="/login">Login</Link></li>
            <li className="nav-item active"><Link to="/signup">Sign Up</Link> </li>
            <li className="nav-item active"><Link to="/products">Products</Link></li>
            <li className="nav-item active"><Link to="/about">About</Link></li>
         <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
         <li className="nav-item cart"> <span className="material-icons white600">shopping_cart</span> </li>


         </ul> */}
          {/**/}
        </div>

      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
