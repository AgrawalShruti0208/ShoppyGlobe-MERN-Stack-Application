//All the routes will be present here at one place
import { fetchProducts, fetchProductByID} from "../Controller/products.controller.js";

export function ProductRoutes(app){
    app.get("/products",fetchProducts); // Fetch a list of products from MongoDB.
    app.get("/products/:id",fetchProductByID); // Fetch details of a single product by its ID in Database.
}
