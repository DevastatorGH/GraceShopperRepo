import React from "react"
import { connect } from "react-redux"
import { fetchProducts } from "../store/products"
import ProductCard from "./ProductCard"

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products

    return products && products.length > 0 ? (
      <div className="row">
        <h1>Random Products For All Your Needs</h1>
        <div className="row all_products_inner">
          <ul className="row">
            {products.map(product => {
              return (
                <li
                  className="col-lg-4 col-md-6 col-sm-6 productCard"
                  key={product.id}
                >
                  <div>
                    <ProductCard product={product} />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    ) : (
      "Products are loading..."
    )
  }
}

const mapState = state => {
  return { products: state.products }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    getProducts: product => dispatch(fetchProducts(product, history))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
