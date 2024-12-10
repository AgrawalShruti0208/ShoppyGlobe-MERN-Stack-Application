// DYNAMIC COMPONENT FOR EVERY PRODUCT id passed in url
// import Hook to get parameter from url
import "./StyleSheets/StyleProductDetails.css"
import { useNavigate ,useParams} from "react-router-dom";
import { useCustomFetch } from "../utils/useCustomFetch"
import { useEffect,useState} from "react"
import { StarRating } from "./StarRating";




export function ProductDetail(){
    const jwtToken = localStorage.getItem("token");
    
    const product_id = useParams(); //Getting the parameter passed

    //evaluating URL for fetching data
    const FetchProducts_URL = `http://localhost:5300/products/${product_id.id}`;

    //state to store data
    const [ProductData,setProductData] = useState([]);

    //state to store index for slider
    const [imageIndex,setImageIndex] = useState(0);

    //getting all the information from custom Fetch Hook
    const {fetchedData,err,isLoading} = useCustomFetch(FetchProducts_URL);

    const navigateTo = useNavigate();

    function handleGoBack(){
        navigateTo(-1);
    }
    
        
    useEffect(()=>{
        // using useEffect to render component once, and then assign the received data 
        if(fetchedData){
            setProductData(fetchedData);
            
            
        }
    },[fetchedData]);

    if(err){ //if err is not null show error message
            return(<div className="box-customHook"><h2>Error occured in API call:</h2><p>{err}</p></div>) 
    }

    if(isLoading){ //if isLoading state TRUE display Loading Data
        return (
            <div className="LoadingPage">
                <p>LOADING PRODUCTS..</p>
            </div>
        ) 
    }

    
    
    if(ProductData){

        function handleAddToCart(){
            fetch("http://localhost:5300/cart",{
                //as browser only accepts fetch API using its options{} to pass the product to the POST HTTP METHOD BODY
                method:'post',
                headers: new Headers({
                    'Authorization': jwtToken?`JWT ${jwtToken}`:"",
                    "Content-Type":"application/json"
                }),
                body:JSON.stringify(ProductData) //sending Product Data to post rquest body after convrting it into json()

            }).then(response=>response.json()).then((data)=>{
                

                if(typeof data === "string"){
                    navigateTo('/AccessDenied');
                }else{
                    location.reload(false);
                }

            });
        }
        
       
        function handlePrevButton(){
            setImageIndex(imageIndex === 0 ? ProductData.images.length - 1 : imageIndex-1);
            console.log("Previous:",imageIndex);
        }
    
        function handleNextButton(){
            setImageIndex(imageIndex === ProductData.images.length -1 ? 0 : imageIndex+1);
            console.log("Next:",imageIndex);
        }

       
        return(
            <div className="ProductDetailPage">
                <div className="BackArrow">
                    <button onClick={handleGoBack}>
                        <img src="/left-arrow.svg" className="BackArrowImg" alt="Back Arrow" height="60px" />
                    </button>
                </div>
                <div className="ProductDetails_First">

                    <div className="SliderDiv">
                       {ProductData.images && <img src={ProductData.images[imageIndex]} alt="" />}
                       <div className="arrowBtnsFlex">
                            <button className="arrowBtns"  onClick={handlePrevButton}><img src="/Left Arrow.gif" alt="" /></button>
                            <button className="arrowBtns" onClick={handleNextButton}><img src="/Right Arrow.gif" alt="" /></button>
                       </div>
                       
                       
                       
                    </div>  

                    <div className="ProductsDescription">
                        <h1 className="Product_Title">{ProductData.title}</h1>
                        <div className="Product_flex1">
                            <h3 className="greyText"><i>category:</i></h3>
                            <h3 className="tags">{ProductData.category}</h3>
                            <h5 className="greyText">|</h5>
                            <h3><StarRating ProductRating={ProductData.rating} starHeight={"20px"} /></h3>
                        </div>
                        <hr />
                        <div className="Product_flex2">
                            <h2>Product Details:</h2>
                            <h3 className="greyText">{ProductData.description}</h3>
                        </div>
                        <hr />
                        <div className="Product_flex2">
                            <h2>Customer Reviews:</h2>
                            {ProductData.reviews && ProductData.reviews.map((reviewData,index)=>{
                                return <div key={index} className="Product_flex3">
                                    <div className="Product_flex1">
                                        <h5>🟪</h5>
                                        <h3>{reviewData.reviewerName} :</h3>
                                        <h5><StarRating ProductRating={reviewData.rating} starHeight={"15px"}/></h5>
                                        <h5 className="greyText">|</h5>
                                        <h3 className="greyText">{reviewData.comment}</h3>
                                    </div>
                                    
                                </div>
                            })}
                        </div>
                        
                    
                    
                    </div>  

                    <div className="ProductAddToCart">
                        <div className="addToCartFlex1">
                            <h3 className="purpleText">-{ProductData.discountPercentage} %</h3>
                            <h2>${ProductData.price}</h2>
                        </div>

                        
                        <button type="submit" className="customBtn" id="AddToCartBtn2" onClick={handleAddToCart}>Add Product to cart🛒</button>
                        <hr />

                        <div className="addToCartFlex2">
                            <img src="/Fast Delivery.gif" alt="" width="17%" />
                            <h3 className="greyText">{ProductData.shippingInformation}</h3>
                        </div>

                        <div className="addToCartFlex2">
                            <img src="/Shield.gif" alt="" width="17%" />
                            <h3 className="greyText">{ProductData.warrantyInformation}</h3>
                        </div>

                        <div className="addToCartFlex2">
                            <img src="/returnPolicy.gif" alt="" width="15%" />
                            <h3 className="greyText">{ProductData.returnPolicy}</h3>
                        </div>
                        
                        
                        
                    </div>

                </div>
            </div>
        )
    }

}




