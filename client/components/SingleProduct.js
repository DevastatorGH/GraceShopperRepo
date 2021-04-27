import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/singleProduct';
import { fetchAddProduct } from '../store/cart';
import {Link}  from "react-router-dom"
import Cart from "./Cart"
import demoCheckout from "./demoCheckout"


const styles = {
  card: {
    maxWidth: 500,
  },
};

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    console.log("Inside Single Product CDMount")
    // const id = this.props.match.params.id;
    // this.props.getSingleProduct(id);
  }

  handleClick(id, price){
    this.props.addProduct(id, Number(this.state.quantity), price)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const product = this.props.product.singleProduct;
   console.log(product, 'inventory')
    return (
      <div className="container">
      <div className="row s_product_inner">

        <div className="col-lg-5">
             <img src={product.imageURL} />
        </div>
        <div className="col-lg-5 offset-lg-1">
        <div className="s_product_text">
             <h3>{product.name}</h3>
             <h2>{`$${(product.price / 100).toFixed(2)}`}</h2>
             {/* <ul>
               <li>Category: Household</li>
               <li>Availibility: In Stock</li>
             </ul> */}
             <p>{product.description}</p>
             <div className="card-area">
               <div className="product_count_button">
               {/* <span className="material-icons">remove_circle_outline</span> */}

               <input name="quantity" onChange={this.handleChange} className="input-number" type="number" value={this.state.quantity} min={1} max={product.inventory}></input>
               {/* <span className="material-icons">add_circle_outline</span> */}
               </div>
                <div className="add_to_card">
                <button onClick={() => this.handleClick(product.id, product.price)} className="btn btn-warning" type="button"><Link to="/cart">Add To Cart</Link></button>
                 </div>
                 <div className="social_icon">
                  <i className="ti-facebook"></i>
                  <i className="ti-twitter-alt"></i>
                 </div>
             </div>
        </div>
        </div>
      </div>
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
    addProduct: (id, quantity, price) => dispatch(fetchAddProduct(id, quantity, price))
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
