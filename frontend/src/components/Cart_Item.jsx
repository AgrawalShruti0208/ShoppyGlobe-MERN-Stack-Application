
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./StyleSheets/StyleCartItem.css"



export function Cart_Item(props){
    const navigateTo = useNavigate();

    const jwtToken = localStorage.getItem("token");

    function handleRemoveCartItem(){
        
        fetch( `http://localhost:5300/cart/${props.item._id}`,{
            //as browser only accepts fetch API using its options{} to pass the productId to the DELETE HTTP METHOD BODY
            method:'DELETE', 
            headers: new Headers({
                'Authorization': jwtToken?`JWT ${jwtToken}`:""
            })
        }).then(response=>response.json()).then((data)=>{


            if(typeof data === "string"){
                navigateTo('/AccessDenied');
            }else{
                location.reload();
            }
            
            
        });
    }

    function handleIncreaseQuantity(){
        const messageObj = {msg:"Increase"};
        fetch( `http://localhost:5300/cart/${props.item._id}`,{
            //as browser only accepts fetch API using its options{} to pass the productId to the DELETE HTTP METHOD BODY
            method:'PUT',
            headers:new Headers({
                'Authorization': jwtToken?`JWT ${jwtToken}`:"",
                "Content-Type":"application/json"
            }),
            body:JSON.stringify(messageObj)

        }).then(response=>response.json()).then((data)=>{
            if(typeof data === "string"){
                navigateTo('/AccessDenied');
            }else{
                location.reload();
            }
        });
    }

    function handleDecreaseQuantity(){
        const messageObj = {msg:"Decrease"};
        fetch( `http://localhost:5300/cart/${props.item._id}`,{
            //as browser only accepts fetch API using its options{} to pass the productId to the DELETE HTTP METHOD BODY
            method:'PUT',
            headers:new Headers({
                'Authorization': jwtToken?`JWT ${jwtToken}`:"",
                "Content-Type":"application/json"
            }),
            body:JSON.stringify(messageObj)

        }).then(response=>response.json()).then((data)=>{
            if(typeof data === "string"){
                navigateTo('/AccessDenied');
            }else{
                if(props.item.Quantity>1){
                    location.reload();
                }
            }
            
        });
    }

    
    
    return(
        <div className="Cart_Item_Card">
            
            <div className="Item_Information">
                <div className="Item_Image">
                    <Link to={`/product/${props.item._id}`} title={"View More Details"}>
                        <img src={props.item.thumbnail} height="250px"/>
                    </Link>
                    
                </div>
                <div className="Item_Info">
                    <h5>{props.item.brand}</h5>
                    <h4>{props.item.title}</h4>
                    <h5>{props.item.description}</h5>
                    <h5 className="stockStatus">{props.item.availabilityStatus}</h5>
                    <h4>${props.item.price}</h4>
                    
                    <div className="Item_Quantity_Section">

                        <button className="QtyBtn" onClick={handleDecreaseQuantity}><span>-</span></button>
                        <button className="QtyBtn" disabled={true}>{`Qty: ${props.item.Quantity}`}</button>
                        <button className="QtyBtn" onClick={handleIncreaseQuantity}><span>+</span></button>
                        
                    </div>

                    <button onClick={handleRemoveCartItem} className="QtyBtn RemoveBtn">Remove Item</button>

                    

                </div>
            </div>
            <div className="Total_Price">
                <h3>${(props.item.price * props.item.Quantity).toFixed(2)}</h3>
            </div>
            
        </div>
    )
}