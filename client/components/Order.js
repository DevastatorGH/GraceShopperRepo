import React from 'react';
import { connect } from 'react-redux';
import { fetchGetCart } from '../store/cart';

export class Order extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    this.props.getCart();
  }

  render() {
    
    return (
      <div></div>
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

export default connect(mapState, mapDispatch)(Order)
