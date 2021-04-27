import React from "react"
import SingleProduct from "./SingleProduct"
import {Link} from "react-router-dom"


const Cart = (props) => {
    console.log("Cart Items", props)

    return (
        <div>
        <h1>My Cart</h1>
            <SingleProduct/>
            <button className="btn btn-primary checkout"><Link to="/checkout">Checkout</Link></button>
        </div>
    )


}


export default Cart;