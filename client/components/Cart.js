
import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { fetchGetCart, fetchCheckout } from "../store/cart"
import { fetchProducts } from "../store/products"
import Checkout from "./demoCheckout"


class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getCart();
    this.props.getProducts();
  }

  handleClick(){

         if(this.props.auth.id){
          this.props.checkout()
          this.props.history.push("/completedOrder")
         } else {
          this.props.history.push("/form")
         }

  }

  render() {
    let totalProducts = 0;
    let totalPrice = 0;
    console.log("Inside Cart", this.props.cart);
    console.log("Products", this.props.products);
    console.log("Auth", this.props.auth)
    return (
      <div className="main-cart-checkout">
        <h1>My Cart</h1>

        <div>
          {this.props.auth.id ? (
            this.props.products.length > 0 ? (
              this.props.cart.map((productOrder) => {
                let product = this.props.products.find(
                  (product) => product.id === productOrder.productId
                );

                totalProducts += productOrder.quantity;
                totalPrice += product.price * productOrder.quantity;

                return (
                  <div key={product.id} className="container">
                    <div className="row s_product_inner">
                      <div className="col-lg-5">
                        <img src={product.imageURL} />
                      </div>
                      <div className="col-lg-5 offset-lg-1">
                        <div className="s_product_text">
                          <h3>{product.name}</h3>
                          <h2>{`$${(product.price / 1000).toFixed(2)}`}</h2>
                          <p>{product.description}</p>
                          <h2>Quantity: {productOrder.quantity}</h2>
                          <button className="btn btn-warning" type="button">Remove From Cart</button>
                          {/* {totalProducts += productOrder.quantity} */}
                        </div>
                      </div>
                    </div>{" "}
                  </div>
                );
              })
            ) : (
              <div>Loading.....</div>
            )
          ) : (
            <div>
            {this.props.cart.map((product) => {
                
                totalProducts += product.quantity;
                totalPrice += product.product.price * product.quantity;
                return (
                  <div key={product.product.id} className="container">
                
                    <div className="row s_product_inner">
                      <div className="col-lg-5">
                        <img src={product.product.imageURL} />
                      </div>
                      <div className="col-lg-5 offset-lg-1">
                        <div className="s_product_text">
                          <h3>{product.product.name}</h3>
                          <h2>{`$${(product.product.price / 1000).toFixed(2)}`}</h2>
                          <p>{product.product.description}</p>  
                          <h2>Quantity: {product.quantity}</h2>
                          {/* {totalProducts += productOrder.quantity} */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              )}
            </div>
          )}
        </div>
        <div>
          <h1>Total Products: {totalProducts}</h1>
          <h1>Order Total: ${(totalPrice / 1000).toFixed(2)}</h1>
        </div>
           <button type="submit" className="btn btn-primary checkout"onClick={this.handleClick}>Checkout</button>
      </div>
    );
  }
}

const mapState = (state) => ({
  cart: state.cart,
  products: state.products,

  auth: state.auth,
});

const mapDispatch = (dispatch) => {
  return {
    getCart: () => dispatch(fetchGetCart()),
    getProducts: () => dispatch(fetchProducts()),
    checkout: () => dispatch(fetchCheckout())
  }
}

export default connect(mapState, mapDispatch)(Cart);
