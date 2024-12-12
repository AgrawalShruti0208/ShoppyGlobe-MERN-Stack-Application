import "./StyleSheets/StyleHeader.css"
import { useNavigate } from "react-router-dom";

import { useEffect, useState, useContext } from "react";
import { useCustomFetch } from "../utils/useCustomFetch";
import { AccessDenied } from "./AccessDenied.jsx";

import { isTokenExpired } from "../utils/HelperFunctions.js";

export function Header(){
    
    // For getting number of cart items initially, using XMLHttpRequest library synchronously to fetch number of Cart Items
    const request = new XMLHttpRequest();
    request.open('GET', 'https://shoppyglobe-mern-stack-application.onrender.com/numberOfCartItems', false);  // `false` makes the request synchronous
    request.send("Recieved number of cart items.");
    
    const data = JSON.parse(request.responseText);
    
    const [numberOfCartItems,setNumberOfCartItems] = useState(data.numberOfCartItems);

    const navigateTo = useNavigate();

    const userEmail = localStorage.getItem("userEmail");
    const jwtToken = localStorage.getItem("token");

    if(jwtToken){
        

        if(isTokenExpired(jwtToken)){
            console.log("token expired!")
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            location.reload();
            alert("JWT Token Expired! Please Login Again!");
            
        }
    
    }
    

    const FetchCartItems_URL = 'https://shoppyglobe-mern-stack-application.onrender.com/cart/allItems';
    const options = {
        method: 'GET', 
        headers: new Headers({
            'Authorization': jwtToken?`JWT ${jwtToken}`:""
        })
    }
    
    

    const {fetchedData} = useCustomFetch(FetchCartItems_URL,options);
    
    useEffect(()=>{
        if(fetchedData){
            
            if(Array.isArray(fetchedData)===true){
                setNumberOfCartItems(fetchedData.length);
            }
            
        
        }
    },[fetchedData]);
    

        

        function handleGoToCart(){
            navigateTo('/cart')
        }
        
        function handleLogin(){
            navigateTo('/UserLogin');
        }

        function handleSignUp(){
            navigateTo('/UserSignUp');
        }

        function handleLogOut(){
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            location.reload();
        }
        

        return(
            <div className="HeaderComponent">
                <div className="Login_SignUp_Div">
                    {!userEmail &&
                    <div className="Login_SignUp_Button">
                        <button onClick={handleSignUp}>Sign up</button>
                        <button onClick={handleLogin}>Login</button>
                    </div>
                    }

                    {userEmail && 
                    <div className="LoginSuccessfulDiv">
                        <div className="Logout_Button_Div" onClick={handleLogOut}>
                    
                    
                            <button className="logOutBtn" title="Click To Log Out!">
                                <img src="/logout.png" alt="logout" height="65px" />
                            </button>
            
            
                            <small>↪Log Out</small>
            
            
                        </div>
                        <div className="userEmail">
                            <input type="text" value={userEmail} readOnly title="User" />
                        </div>
                        
                    </div>
                     }
                    
                </div>
                <div className="content">
                    <h1 className="title">ShoppyGlobe 
                        <div className="aurora">
                        <div className="aurora__item"></div>
                        <div className="aurora__item"></div>
                        <div className="aurora__item"></div>
                        <div className="aurora__item"></div>
                        </div>
                    </h1>
                    <p className="subtitle">Your most loved shopping🛒 application</p>
                </div>

                <div className="Cart_Items_Button">
                    
                    
                        <button className="cartValueOverlap" onClick={handleGoToCart} title="Click To View Cart!">

                            {!userEmail && <img src="/empty-cart.png" alt="empty_cart" width="100px" height="90px" />}

                            {userEmail && 
                                <>
                                    
                                    {numberOfCartItems == 0 && <img src="/empty-cart.png" alt="empty_cart" width="100px" height="90px" />  }
                                    {numberOfCartItems != 0 && 
                                        <>
                                            <input type="text" value={numberOfCartItems} className="CartItemInput" readOnly/>
                                            <img src="/shopping-cart.png" alt="shpping_cart" width="100px" height="90px" />

                                        </>   
                                    }
                                </>
                            }
                            

                            
                        </button>
                    
                    
                    <small>↪Cart</small>
                    
                    
                </div>
            </div>
        )

    
}