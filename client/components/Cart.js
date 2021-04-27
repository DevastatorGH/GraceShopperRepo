import React from "react"
import {Link} from "react-router-dom"
import { connect } from 'react-redux';
import { fetchGetCart } from '../store/cart';

export class Cart extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    this.props.getCart();
  }

  render() {
console.log("Inside Cart", props)
    return (
      <div>
      <h1>My Cart</h1>
           <button className="btn btn-primary checkout"><Link to="/checkout">Checkout</Link></button>
      </div>
    );
  }
}

const mapState = (cart) => ({
    cart,
  });


const mapDispatch = (dispatch) => {
      return {
        getCart: () => dispatch(fetchGetCart()),
      };
    };

export default connect(mapState, mapDispatch)(Cart)



