import React from 'react';
import { addProduct } from '../store/products';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class AddProducts extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addProduct({ ...this.state });
  }
  render() {
    const { name, description, price } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <form id='product-form' onSubmit={handleSubmit}>
          <label htmlFor='name'>Product Name</label>
          <input name='name' onChange={handleChange} value={name} />
          <label htmlFor='description'>Product Description</label>
          <input
            name='description'
            onChange={handleChange}
            value={description}
          />
          <label htmlFor='price'>Product Price</label>
          <input name='price' onChange={handleChange} value={price} />
          <button type='submit'>Submit Product</button>
          <Link to='/'>Cancel</Link>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
  addProduct: (product) => dispatch(addProduct(product, history)),
});

export default connect(null, mapDispatch)(AddProducts);
