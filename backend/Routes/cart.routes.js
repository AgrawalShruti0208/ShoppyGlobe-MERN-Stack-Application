import { addProductToCart,fetchCartItems,deleteCartItemByID,updateCartItemByID,deleteCartItems,getNumberOfCartItems} from "../Controller/cart.controller.js";
import { checkUserAuthentication } from "../ProtectRoutesMiddleware/checkUserAuthentication.js";

export function CartRoutes(app){
    app.post("/cart",checkUserAuthentication,addProductToCart);//Add a product to the shopping cart.
    app.put("/cart/:id",checkUserAuthentication,updateCartItemByID); //Update the quantity of a product in the cart.
    app.delete("/cart/:id",checkUserAuthentication,deleteCartItemByID); //Remove a product from the cart.

    //Route for Extra Purposes
    app.get("/cart/allItems",checkUserAuthentication,fetchCartItems); // Fetch a list of cart Items from MongoDB.
    app.delete("/cart",deleteCartItems);//Delete all items from MongoDB
    app.get("/numberOfCartItems",getNumberOfCartItems);

}