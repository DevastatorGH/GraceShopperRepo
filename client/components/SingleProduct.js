import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/singleProduct';

const styles = {
  card: {
    maxWidth: 500,
  },
};

export class SingleProduct extends React.Component {
  constructor(props) {
    console.log('inside constructor function,', props);
    super(props);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    //    const id = this.props.match.params.productId;
    console.log('Single Product Component Did Mount product id', id);
    this.props.getSingleProduct(id);
  }

  render() {
    console.log('inside render', this.props);
    console.log('second render', this.props.product);
    console.log(this.props.product.singleProduct);

    const product = this.props.product.singleProduct;
    console.log('props:', product);
    return (
      <div className="container">
      <div className="row s_product_inner">

        <div className="col-lg-5">
             <img src={product.imageURL} />
        </div>
        <div className="col-lg-5 offset-lg-1">
        <div className="s_product_text">
             <h3>{product.name}</h3>
             <h2>{`$${(product.price / 1000).toFixed(2)}`}</h2>
             {/* <ul>
               <li>Category: Household</li>
               <li>Availibility: In Stock</li>
             </ul> */}
             <p>{product.description}</p>
             <div className="card-area">
               <div className="product_count_button">
               <span className="material-icons">remove_circle_outline</span>

               <input className="input-number" type="text" value="1" min="0" max="10"></input>
               <span className="material-icons">add_circle_outline</span>
               </div>
                <div className="add_to_card">
                  <button className="btn btn-warning" type="button">ADD TO CART</button>
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
      // <div>
      //   {this.props.product.singleProduct ? (
      //     <div>
      //       <img src={product.imageURL} />
      //       <h1>{product.name}</h1>
      //       <h2>{product.description}</h2>
      //       <h2>{`$${(product.price / 1000).toFixed(2)}`}</h2>
      //     </div>
      //   ) : (
      //     <h1>loading</h1>
      //   )}
      // </div>
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
