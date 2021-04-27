import React from 'react';
import { connect } from 'react-redux';
import { fetchUpdateProduct, fetchDeleteProduct } from '../store/singleProduct';

export class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleClick = this.handleClick.bind(this);
  }

  //   componentDidUpdate(prevProps) {
  //     console.log();
  //     if (prevProps.product.id !== this.props.product.id) {
  //       this.setState({
  //         name: this.props.product.name || '',
  //       });
  //     }
  //   }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateProduct({ ...this.props.product, ...this.state });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const product = this.props.product;
    const { name } = this.state;
    return (
      <div>
        <h3>Update Product Here</h3>
        <form id='product-form' onSubmit={handleSubmit}>
          <label htmlFor='name'>New Product Name</label>
          <input name='name' onChange={handleChange} value={name} />
          <button type='submit'>Submit</button>
        </form>
        <form onSubmit={(ev) => ev.preventDefault()}>
          <button
            type='submit'
            onClick={() => {
              this.props.deleteProduct(this.props.match.params.productId);
            }}
          >
            Delete
          </button>
        </form>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatch = (dispatch) => ({
  updateProduct: (product) => dispatch(fetchUpdateProduct(product, history)),
  deleteProduct: (product) => dispatch(fetchDeleteProduct(product, history)),
});

export default connect(mapState, mapDispatch)(EditProduct);
