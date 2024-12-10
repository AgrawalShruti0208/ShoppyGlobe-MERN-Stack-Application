import cartItemsModel from "../Model/CartItemsModel.js";
import notifier from 'node-notifier';


export async function addProductToCart(req,res){

    
    const product = req.body;
    cartItemsModel.exists({ _id: product._id }).then(exists => {
        if (exists) {
            res.status(400).json({message:"Product Already Added in the Shopping Cart✅"});
            notifier.notify({
                title: 'Alert',
                message: 'Product Already Added in the Shopping Cart✅',
                icon: '🛒'
            });
           
        } else {
            cartItemsModel.create(product)
            .then((savedData) =>{
                res.send(savedData);
                notifier.notify({
                    title: 'Success',
                    message: 'Product Added to the Shopping Cart🛒',
                    icon: '🛒'
                })
            }).catch((err)=>{
                res.status(500).json({message:"Failed to Add Item in the Cart"});
                notifier.notify({
                    title: '🚨Request Failed',
                    message: 'Product Not Added in the Cart',
                icon: '🛒'
                });
            });
            
            
        }
    })
                    
    
}

export async function getNumberOfCartItems(req,res){
    const number = await cartItemsModel.countDocuments();
    
    res.send({numberOfCartItems:number});

}

export async function fetchCartItems(req,res){
    
    cartItemsModel.find({})
    .then((data)=>{
        
        if(!data){
            console.log("Something Went Wrong,",err.message);
            return res.status(400).json({message:"Something Went Wrong,"+err.message});
        }

        res.send(data);
    })
    .catch((err)=>{
        //catch => if not successful to fetch data, send error 
        console.log("Error in fetching the Cart Items:",err.message);
        res.status(500).json({message:"Error in fetching the Cart Items:"+err.message});
    });
}


export function deleteCartItemByID(req,res){
     cartItemsModel.findByIdAndDelete(req.params.id)
     .then(deletedItem => {
        if (deletedItem) {
            res.send({"Successfully deleted the item from cart":deletedItem});
            notifier.notify({
                title: 'Success',
                message: 'Product Deleted⛔ from the Shopping Cart',
                icon: '🛒'
            })
        } else {
          console.log('⚠️ ALERT: No Product Exists with this ID in the Cart.');
          return res.status(400).json({message:'⚠️ALERT: No Product Exists with this ID in the Cart.'});
        }
        
    })
    .catch((error)=>{
        //catch => if not successful to fetch data, send error 
        console.log("Error in deleting the product:",error);
        res.status(500).json({message:"Error in deleting the product:"+error});
        notifier.notify({
            title: '🚨Request Failed',
            message: 'Product Not Deleted from the Cart',
        icon: '🛒'
        });
    });
}

export function updateCartItemByID(req,res){
    
    cartItemsModel.findById(req.params.id)
   .then((data)=>{
           
       if(!data){
           console.log("Something Went Wrong,",err.message);
           return res.status(400).json({message:"Something Went Wrong,"+err.message});
       }

       const operationToPerform = req.body.msg; //increase or Decrease the Quantity
       let setQuantity = data.Quantity;

       if(operationToPerform === "Increase"){
            setQuantity +=1;
       }
       if(operationToPerform === "Decrease"){
            if(setQuantity>1){
                setQuantity -=1;
            }else{
                notifier.notify({
                    title: '🚨Update Failed',
                    message: 'Minimum Quantity for Cart Item Reached!',
                    icon: '🛒'
                });
            }
            
        }

        cartItemsModel.updateOne({ _id: data._id }, { $set: { Quantity: setQuantity} }).then(async(item) => {
            const updatedItem = await cartItemsModel.findById(data._id);
            res.send([{"Item Before Update":data},{"Operation Performed":operationToPerform+" Quantity"},{"Item After Update":updatedItem}])
        });


   })
   .catch((err)=>{
       //catch => if not successful to fetch data, send error 
       console.log("Error in updating the cart Item Quantity:",err.message);
       res.status(500).json({message:"Error in updating the cart Item Quantity:"+err.message});
       notifier.notify({
           title: '🚨Request Failed',
           message: 'Update Failed for the Item in Cart',
       icon: '🛒'
       });
   });
}

export function deleteCartItems(req,res){
    cartItemsModel.deleteMany({})
    .then((data)=>{
            
        if(!data){
            console.log("Something Went Wrong,",err.message);
            return res.status(400).json({message:"Something Went Wrong,"+err.message});
        }
        res.send({"Successfully deleted the items from cart":data});
        
    })
    .catch((err)=>{
        //catch => if not successful to fetch data, send error 
        console.log("Error in deleting the products:",err.message);
        res.status(500).json({message:"Error in deleting the products:"+err.message});
        
    });
}