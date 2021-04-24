import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/singleProduct';

export class SingleProduct extends React.Component {
  constructor(props) {
    console.log('inside constructor function,', props);
    super(props);
  }

  componentDidMount() {
    const id = this.props.match.params.productId;
    console.log('product id', id);
    this.props.getSingleProduct(id);
  }

  render() {
    console.log('inside render', this.props);
    console.log('second render', this.props.product);
    console.log(this.props.product.singleProduct);

    const product = this.props.product.singleProduct;
    console.log('props:', product);
    return (
      <div>
        {this.props.product.singleProduct ? (
          <div>
            <img src={product.imageURL} />
            <h1>{product.name}</h1>
            <h2>{product.description}</h2>
            <h2>{`$${(product.price / 1000).toFixed(2)}`}</h2>
          </div>
        ) : (
          <h1>loading</h1>
        )}
      </div>
    );
  }
}

const mapState = (product) => ({
  product,
});

const mapDispatch = (dispatch, { history }) => {
  return {
    getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
