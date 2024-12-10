import "./StyleSheets/StyleProductItem.css"
import { StarRating } from "./StarRating";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

export function ProductItem(props){
    
    const product = props.productData;
    const navigateTo = useNavigate();
    const jwtToken = localStorage.getItem("token");
    
    function handleAddToCart(){
        fetch("http://localhost:5300/cart",{
            //as browser only accepts fetch API using its options{} to pass the product to the POST HTTP METHOD BODY
            method:'post',
            headers: new Headers({
                'Authorization': jwtToken?`JWT ${jwtToken}`:"",
                "Content-Type":"application/json"
            }),
            body:JSON.stringify(product) //sending Product Data to post rquest body after convrting it into json()

        }).then(response=>response.json()).then((data)=>{
            

            if(typeof data === "string"){
                navigateTo('/AccessDenied');
            }else{
                location.reload(false);
            }

        });
        
    }


    return(
        <div className="ProductItemCard">
                
            
                {/* cover image */}
                <img src={product.thumbnail} className="product_thumbnail" height="300px" width="300px" />

                {/* div to store title of the book and its description */}
                <div className="ProductCardText">
        
                    <h1 className="product_title">{product.title}</h1>
                    
                    <div className="product_tags">
                        <h3>Tags:</h3>
                        {product.tags.map((tag,index)=>{
                            return (
                            <h3 className="tags" key={index}>{tag}</h3>
                            
                            )
                        })}
                    </div>
                    
                    <div className="product_price">
                        <h2>{`$ ${product.price}`}</h2>  
                        <span>{`(${product.discountPercentage}% off)`}</span>
                    </div>
                   
                    
                    <StarRating ProductRating={product.rating} starHeight={"25px"}/>
                </div>
            
                
                <div className="Product_Item_Btns">
                    <button type="submit" className="customBtn" id="AddToCartBtn" onClick={handleAddToCart}>Add Product to cart🛒 </button>
                    

                   
                    
                    <button type="submit" className="customBtn" id="ViewDetailsBtn">
                        <Link to={`/product/${product._id}`} key={product.id} >View More Details🔎</Link> 
                    </button>
                     
                </div>
                

            
                
                
            
            
            
        </div>
    )
}