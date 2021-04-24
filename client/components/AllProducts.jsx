import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchProducts } from "../store/products"
import ProductCard from "./ProductCard"

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    console.log("All Products Component", this.props)
    const { products } = this.props

    if (!this.props) {
      return <div>Loading Products...</div>
    }

    return (
      <div>
        {products.map(product => {
          ;<div className="productCard" key={product.id}>
            <ProductCard product={product} />
          </div>
        })}
      </div>
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
