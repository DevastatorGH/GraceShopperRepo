import React from "react";
import { connect } from "react-redux";
import { fetchGetCart } from "../store/cart";

export class Order extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCart();
  }

  render() {
    console.log(this.props.cart, 'aaaa');
    return <div>
        {this.state.cart.map(productOrder => {
            let product = this.props.products.find( product => product.id === productOrder.productID)
            return (<h1></h1>)
        })}
    </div>;
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    products: state.products
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: () => dispatch(fetchGetCart()),
  };
};

export default connect(mapState, mapDispatch)(Order);
