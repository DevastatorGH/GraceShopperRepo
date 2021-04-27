import React from "react"
import {Link} from "react-router-dom"
import { connect } from "react-redux"

class Checkout extends React.Component{
    constructor(props){
        super(props)
    }

    render(){

        return (
            <div>
            <form id="form" class="form">
            <h2>Checkout Form</h2>
          <h5>Enter Your Checkout Information</h5>
            <div className="form-control">
              <label for="username">Username</label>
              <input type="text" id="username" placeholder="Username/ Email address " />
              <small>Error message</small>
             </div>
            {/* <div className="form-control">
              <label for="address">Address</label>
              <input type="text" id="adress" placeholder="Enter address" />
              <input type="text" id="adress" placeholder="Enter address" />
              <small>Error message</small>
            </div>
           <div className="form-control">
              <label for="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Enter password again"
              />
              <small>Error message</small> */}
            {/* </div>  */}
            {/* <div className="redirect-link">
              <h5>Don't have an account? Sign Up here </h5>
            </div> */}
            <button type="submit">Submit Payment </button>
          </form>
        </div>


        )
    }


}

const mapState = state => ({
  cart: state.cart,
  products: state.products
})

const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(fetchGetCart()),
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(Checkout)