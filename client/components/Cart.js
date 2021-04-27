import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { fetchGetCart } from "../store/cart"
import { fetchProducts } from "../store/products"

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getCart()
    this.props.getProducts()
  }

  render() {
    let totalProducts = 0
    let totalPrice = 0
    console.log("Inside Cart", this.props)
    console.log("Our Cart", this.props.cart)
    console.log("Products", this.props.products)
    return (
      <div>
        <h1>My Cart</h1>
        <div>
          {this.props.products.length > 0 ?
           this.props.cart.map(productOrder => {

            let product = this.props.products.find(
              product => product.id === productOrder.productId
            )

            totalProducts += productOrder.quantity
            totalPrice += product.price * productOrder.quantity

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
                      {/* {totalProducts += productOrder.quantity} */}
                    </div>
                  </div>
                </div>{" "}
              </div>
            ) })
            :
            <div>Loading.....</div>

          }

        </div>
        <div>
        <h1>Total Products: {totalProducts}</h1>
        <h1>Order Total: ${(totalPrice/1000).toFixed(2)}</h1>
        </div>

        <div>
        <button className="btn btn-primary checkout">
          <Link to="/checkout">Checkout</Link>
        </button>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  products: state.products
})

const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(fetchGetCart()),
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(Cart)
