import { useRouteError } from "react-router-dom" //Hook provided by Library consisting more details about the error occured
import { useNavigate } from "react-router-dom";

export function ErrorPage() { //Component to Handle Error in Routing
    const err = useRouteError(); //getting error using Hook
    const navigateTo = useNavigate();

    function handleReturn(){
        navigateTo("/");
    }
    return (
      <div className="ErrorPageDiv">
            <div className="ErrorHeading">
                <h1>Error Page</h1>
            </div>
            
            <h2>{err.status} {err.statusText}</h2>
            <h3>{err.data}</h3>

            <div>
                <button className="customBtn" onClick={handleReturn}>Return Back To Home</button>
            </div>
      </div>
    )
  }