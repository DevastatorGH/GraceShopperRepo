import axios from "axios"
import { TOKEN } from "./auth"

// action creator
const ADD_PRODUCT = "ADD_PRODUCT"


const addProduct = (product) => {
    return {
        type: ADD_PRODUCT,
        product
    }
}


export const fetchAddProduct = (id, quantity) => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem(TOKEN)
            console.log("Token inside of Fetch Add Product", token)

            if(token){
               const { data } = await axios.get(`/api/products/${id}`, quantity)
               console.log("Data returned after token authorized", data)
               dispatch(addProduct(id, quantity))
            } else {

                if(localStorage.getItem("cart")){
                    let cart = JSON.parse(localStorage.getItem("cart"))
                    cart.push({id:quantity})
                    localStorage.setItem("cart", JSON.stringify(cart))
                } else {
                    let cart = [{id:quantity}]
                    // "[{1: 4}, {3:1}]"
                    localStorage.setItem("cart", JSON.stringify(cart)) // take array stringify it and set it on local storage

                }

            }

        } catch (error) {
            console.log("Error in Fetch Add Product", error)
        }
    }
}