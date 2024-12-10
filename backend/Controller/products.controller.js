import ProductsModel from "../Model/ProductsModel.js";


export async function fetchProducts(req,res){
    try{
        const url = 'https://dummyjson.com/products?limit=30&skip=80';
        //try =>if successful to fetch data
        fetch(url)
        .then(response => response.json())
        .then(async(data)=>{
            const number = await ProductsModel.countDocuments();
            
            if(number!==30){
                ProductsModel.create(data.products).then(savedData =>console.log("Products saved in database."));
                
            }
            res.send(await ProductsModel.find({}));
        })
        .catch((err)=>{
            console.log("Something Went Wrong,",err.message);
            res.status(400).json({message:"Something Went Wrong,"+err.message});
        });
           
        
        
    }catch(error){
        //catch => if not successful to fetch data, send error 
        console.log("Error in FETCHING List of All Users:",error.message);
        res.status(500).json({message:"Error in FETCHING List of All Users:"+error.message});
    }
}

export function fetchProductByID(req,res){
    
        //Using findById method of Mongoose to fetch selected data using its unique object id
        //To make sure id criteria is converted into proper format, using exec() method on query 
        //findById is also an asynchronous operation so using async-await 
    
        ProductsModel.findById(req.params.id)
        .then((data)=>{
            
            if(!data){
                console.log("Something Went Wrong,",err.message);
                return res.status(400).json({message:"Something Went Wrong,"+err.message});
            }

            res.send(data);
        })
        .catch((err)=>{
            //catch => if not successful to fetch data, send error 
            console.log("Error in fetching the product:",err.message);
            res.status(500).json({message:"Error in fetching the product:"+err.message});
        });
           
}

