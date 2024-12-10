import mongoose from "mongoose";

const cartItemsSchema = mongoose.Schema({
    thumbnail: String,
    brand: String,
    title: String,
    description: String,
    availabilityStatus: String,
    price: Number,
    Quantity:{
        type: Number,
        default:1
    }

});

const cartItemsModel = mongoose.model("cartItems",cartItemsSchema);

export default cartItemsModel;