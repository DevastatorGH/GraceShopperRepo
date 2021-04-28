import React from "react"
import {Link} from "react-router-dom"
import { connect } from "react-redux"
import {fetchCheckout} from "../store/cart"

class Checkout extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          email: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleClick(){
      this.props.checkout(this.state.email)
      this.props.history.push('/completedOrder');
    }
    handleChange(event){
      this.setState({
        [event.target.name]: event.target.value,
      });
    }


    render(){

        return (
            <div>
            <form id="form" className="form">
            <h2>Checkout Form</h2>
          <h5>Enter Your Checkout Information</h5>
            <div className="form-control">
              <label htmlFor="username">Username</label>
              <input name="email" onChange={this.handleChange} type="text" value={this.state.email} id="email" placeholder="Email Address " />
             </div>

            <button onClick={() => this.handleClick()} type="submit">Submit Payment </button>
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
    getProducts: () => dispatch(fetchProducts()),
    checkout: (email) => dispatch(fetchCheckout(email))

  }
}

export default connect(mapState, mapDispatch)(Checkout)