import React from "React"


const AddCartItems = (cartItems) => {
  // when user clicks on add to Cart button
        // this component takes the number inside the quanitty tag and adds
            // does it add the number of products
            // or does it add just the product

        // backend work complete for linking this to the database and localstorage
console.log("Items passed to Cart", cartItems)
    return (

        <div>
         <span className="material-icons">
            shopping_cart
         </span>
        </div>


    )

}


export default AddCartItems;