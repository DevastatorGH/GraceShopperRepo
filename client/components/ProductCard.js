import React from "react"
import {Link} from "react-router-dom"

const ProductCard = props => {
  const { product } = props

  return (
    <div className="row product-card">
    <div className="col-lg-4 col-md-6 col-sm-6">
    <div className="card mb-50 text-center" style={{ width: "20rem" }}>
      <img
        className="card-img-top"
        src={product.imageURL}
        alt="Product image"
      />
      <div className="card-body">
        <Link to={`/products/${product.id}`}>
          <h5 className="card-title">{product.name}</h5>
        </Link>

        <h5 className="card-price">
          {(product.price / 1000).toFixed(2)}
        </h5>
      </div>
    </div>
   </div>
   </div>
  )
}

export default ProductCard

