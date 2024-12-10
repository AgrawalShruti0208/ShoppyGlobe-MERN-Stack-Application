import { useNavigate } from "react-router-dom";


export function PlacedOrder(){

    var runAnonymousFunction = setTimeout(function(){
        confetti({
            particleCount: 250,
            spread: 90,
            origin: { x:0,y: 0.7 },
            angle:60
          });
          confetti({
            particleCount: 250,
            spread: 90,
            origin: { x:1,y: 0.7 },
            angle:120
          });
    },1200);

    const navigateTo = useNavigate();
   
    function handleGoBack(){
        navigateTo("/");
    }
    
	return (
		<div className="PlaceOrderDiv">
            <h1 style={{"letter-spacing":"2px"}}>CONGRATULATIONS!</h1>
            <h2>Order Placed Successfully!</h2>
            <button className="customBtn" style={{"font-size":"1.5rem"}} onClick={handleGoBack}>Keep Shopping!</button>
			
		</div>
	);

    
}