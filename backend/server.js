import express from "express"
import mongoose from "mongoose"
import path from "path";

//importing routes function in the server to run all the API routes
import { ProductRoutes } from "./Routes/products.routes.js"; 
import { CartRoutes } from "./Routes/cart.routes.js";
import { UserRoutes } from "./Routes/users.routes.js";

import cors from "cors" //importing 'cors' which is used to run and connect both local servers -for frontend and backend
//CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.


//Node.js body parsing middleware.
//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
//As receiving request body from front-end on button click
import bodyParser from "body-parser";
import {loadEnv} from "../backend/loadEnv.js";


//creating express application 
const app = new express();
const _dirname = path.resolve();
loadEnv('./config.env');

app.use(express.json()); //Middleware to accept json data from client in the server API
app.use(cors()); //using the middleware cors 
app.use(bodyParser.json());//using body-parser to check and convert request body in proper format

app.use(express.static(path.join(_dirname, "/frontend/dist")))

//invoking routes function to run all the API routes
ProductRoutes(app); 
CartRoutes(app);
UserRoutes(app);

app.get('*', (req,res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

//Connecting mongoose in NodeJS with MongoDB using connection url provided by mongoDB compass for making a connection
    //MongoDB Compass String:"mongodb://localhost:27017/ShoppyGlobeApplication"
    //MongoDB Atlas String:"mongodb+srv://shrutiagrawal155:u1OQPQrqjVQc1NqX@shoppyglobeapp.yqohw.mongodb.net/"
    
    // Connection string from MongoDB Atlas
    let url="mongodb+srv://shrutiagrawal155:u1OQPQrqjVQc1NqX@shoppyglobeapp.yqohw.mongodb.net/ShoppyGlobe_DB";
    

    mongoose
    .connect(url)
    .then((data)=>{
            console.log("Connection with MongoDB Database Successful!");

            //creating server to run the application on specified port number only when connection with database is successful
            app.listen(5300,()=>{
                console.log("created server to run application on port number 5300");
            });
        }
    )
    .catch((error)=>console.log("Connection with MongoDB Database Unsuccessful!\nError:",error));

