import React from 'react';
import { connect } from 'react-redux';
import { fetchUpdateProduct, fetchDeleteProduct } from '../store/singleProduct';
import { Link } from 'react-router-dom';

const initialState = {};

export class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateProduct({ ...this.state });
    this.setState(initialState);
  }
  handleClick() {
    //add delete here
  }

  render() {
    return (
      <div>
        <h3>Update Product Here</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='name'>New Product Name</label>
          <input
            required
            name='name'
            onChange={this.handleChange}
            value={this.state.name}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}
const mapDispatch = (dispatch) => ({
  updateProduct: (product) => dispatch(fetchUpdateProduct(product)),
  deleteProduct: (product) => dispatch(fetchDeleteProduct(product)),
});

export default connect(mapDispatch)(EditProduct);
