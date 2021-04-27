import React from 'react';
import { connect } from 'react-redux';
import {
  fetchSingleProduct,
  fetchUpdateProduct,
  fetchDeleteProduct,
} from '../store/singleProduct';

const initialState = { name: '' };
export class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    console.log('initial state:', initialState);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleClick = this.handleClick.bind(this);
  }

  //   componentDidMount() {
  //     const id = this.props.match.params.id;
  //     this.props.getProduct(id);
  //   }

  componentDidUpdate(prevProps) {
    console.log('prevProps:', prevProps);
    console.log('this props', this.props);
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState({
        name: this.props.product.name || '',
        id: this.props.match.params.id,
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.props);
    this.props.updateProduct({ ...this.props.match.params, ...this.state });
  }

  render() {
    //const { handleChange, handleSubmit } = this;
    //const product = this.props.product;
    //const { name } = this.state;
    return (
      <div>
        <h3>Update Product Here</h3>
        <form id='product-form' onSubmit={this.handleSubmit}>
          <label htmlFor='name'>New Product Name</label>
          <input
            name='name'
            type='text'
            onChange={this.handleChange}
            value={this.state.name}
          />
          <button type='submit'>Submit</button>
        </form>
        <form onSubmit={(ev) => ev.preventDefault()}>
          <button
            type='submit'
            onClick={() => {
              this.props.deleteProduct(this.props.match.params.id);
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
  //   getProduct: (id) => dispatch(fetchSingleProduct(id)),
  updateProduct: (product) => dispatch(fetchUpdateProduct(product, history)),
  deleteProduct: (product) => dispatch(fetchDeleteProduct(product, history)),
});

export default connect(mapState, mapDispatch)(EditProduct);

//
