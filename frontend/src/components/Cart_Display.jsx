
import { useNavigate } from "react-router-dom";
import { Cart_Item } from "./Cart_Item";
import { useEffect ,useState} from "react";


import { useCustomFetch } from "../utils/useCustomFetch.js";
import { isTokenExpired } from "../utils/HelperFunctions.js";


import "./StyleSheets/StyleCartDisplay.css"


export function Cart_Display(){
    const [Cart,setCartData] = useState([]);
    const navigateTo = useNavigate();
    

    const jwtToken = localStorage.getItem("token");
    // if(jwtToken){
        

    //     if(isTokenExpired(jwtToken)){
    //         localStorage.removeItem('token');
    //         localStorage.removeItem('userEmail');
    //         location.reload();
            
    //     }

    // }
    
    
    const FetchCartItems_URL = 'http://localhost:5300/cart/allItems';
    const options = {
        method: 'GET', 
        headers: new Headers({
            'Authorization': jwtToken?`JWT ${jwtToken}`:""
        })
    }
    
    
    

    const {fetchedData,err} = useCustomFetch(FetchCartItems_URL,options);

    useEffect(()=>{
        if(fetchedData){
            
            if(Array.isArray(fetchedData)===true){
                setCartData(fetchedData);
            }else{
                navigateTo('/AccessDenied');
            }
            
        
        }
    },[fetchedData]);

    

    if(err){ //if err is not null show error message
        return(<div className="box-customHook"><h2>Error occured in API call:</h2><p>{err}</p></div>) 
    }

    if(Cart){   

        
        let totalItems = 0, totalAmount = 0; 
    
        Cart.map((item,index)=>{
            totalItems += item.Quantity;
            totalAmount += item.price * item.Quantity;
        })
        
        
        const Total_Amount = (parseFloat(totalAmount)+10).toFixed(2) //shipping charges

        
    

        

        function handleGoBack(){
            navigateTo("/");
        }

        function handlePlaceOrder(){
            fetch( "http://localhost:5300/cart",{
                //as browser only accepts fetch API using its options{} to pass the productId to the DELETE HTTP METHOD BODY
                method:'DELETE'
            }).then(response=>response.json()).then(data=>console.log("Removed Items from cart."));

            navigateTo('/Final');
            location.replace(location.href);
            
        }
        

        return(
            <div className="Cart_Display">
                <div className="BackArrow2">
                            
                            <button onClick={handleGoBack}>
                                <img src="/left-arrow.svg" className="BackArrowImg2" alt="Back Arrow" height="60px" />
                            </button>

                            <h3>Continue Shopping</h3>
                </div>

                {Cart.length==0 && (
                    <div className="EmptyCartDiv">
                    
                        <div className="emptyCartOverlay">
                            <div className="EmptyCartHeading">
                                <h1>Your cart is Empty.</h1>
                            </div>
                            
                            <img src="/empty cart page.png" alt="" />
                        </div>
                        
                            
                    </div>
                )}

                {Cart.length!=0 && (
                    <div className="CartItems_DisplayDiv">
                        <div className="ShoppingCart">
                            <div className="ShoppingCartHeading">
                                <h1>Shopping Cart</h1>
                            </div>
                            
                            
                            <div className="ShoppingCartSections">
                                <div className="ShoppingCartItems">
                                    {
                                        Cart.map((data)=>{
                                        return <Cart_Item key={data._id} item = {data} />
                                        })
                                    }
                                    
                                </div> 
                                <div className="ShoppingCartCheckout">
                                    <h3>PRICE DETAILS ({totalItems} {totalItems===1?"Item":"Items"})</h3>
                                    
                                    <div className="cartCheckOutFlex">
                                        <p>Total MRP</p>
                                        <p><strong>${totalAmount}</strong></p>
                                    </div>

                                    <div className="cartCheckOutFlex">
                                        <p>Shipping Fee</p>
                                        <p><strong>$10</strong></p>
                                    </div>

                                    <hr />
                                    <div className="cartCheckOutFlex">
                                        <h3>Total Amount</h3>
                                        <h3>${Total_Amount}</h3>
                                    </div>
                                    
                                    
                                    <button type="submit" className="PlaceOrderBtn" onClick={handlePlaceOrder}>PLACE ORDER</button>
                                    
                                </div>
                            </div>
                        
                        
                        </div>
                    </div>
                )}
            
                    
                
            </div>
        

        )
    }
} 