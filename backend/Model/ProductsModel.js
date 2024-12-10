import mongoose from "mongoose";

 
// strict false will allow you to save document which is coming from the api
const productsSchema = mongoose.Schema({}, { strict: false });
const ProductsModel = mongoose.model("products",productsSchema);

//exporting model
export default ProductsModel;
