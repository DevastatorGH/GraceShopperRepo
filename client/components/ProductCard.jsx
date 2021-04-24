import React from "react"
import Link from "react-router-dom"

const ProductCard = props => {
  const { product } = props

  return (
    <div className="card" style={{ width: "20rem" }}>
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
          Fuel Level: {(product.price / 1000).toFixed(2)}
        </h5>
      </div>
    </div>
  )
}

export default ProductCard
