import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import ProductCard from "./ProductCard";
import Pagination from "./common/pagination"

export class AllProducts extends React.Component {
  // This is saying that each page should only have 8 products
 state = {
    pageSize: 5
  };

  componentDidMount() {
    this.props.getProducts();
  }

  // event handler for pagaination page change


  handlePageChange = (page) => {
    console.log(page)
  }

  render() {
    console.log("All Products Component", this.props);
    const products = this.props.products;
    const count = this.props.products.length

    return products && products.length > 0 ? (
      <div className="container">
      <div className="row all_products_inner">
        <ul>
          {products.map((product) => {
            return (
            <li className="productCard" key={product.id}>
              <div>
                <ProductCard product={product}/>
              </div>
            </li>);
          })}
        </ul>
        </div>
        <Pagination
          itemsCount={count}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}/>
      </div>
    ) : (
      "Products are loading..."
    );
  }
}

const mapState = (state) => {
  return { products: state.products };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getProducts: (product) => dispatch(fetchProducts(product, history)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
