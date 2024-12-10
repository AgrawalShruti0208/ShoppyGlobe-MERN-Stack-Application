import { useNavigate } from "react-router-dom";

export function AccessDenied(){
    const navigateTo = useNavigate();

    function handleReturn(){
        navigateTo("/UserSignUp");
    }
    function handleGoBack(){
        navigateTo("/");
    }

    return (
        <div className="AccessDeniedPage">
            <div className="BackArrow2">
                                
                <button onClick={handleGoBack}>
                    <img src="/left-arrow.svg" className="BackArrowImg2" alt="Back Arrow" height="60px" />
                </button>
            
                <h3>Back to Main Page</h3>
            </div>
            <div className="ErrorPageDiv">
                
                <div className="ErrorHeading">
                    <h1>Access Denied</h1>
                </div>
                
                <h2>401 : Unauthorized</h2>
                <h3>Please Login/Sign up to perform this operation.</h3>

                <div>
                    <button className="customBtn" onClick={handleReturn}>Click to Login/Sign Up</button>
                </div>
        </div>

        </div>
      
    )

}