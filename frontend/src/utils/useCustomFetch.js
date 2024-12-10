// Javascript file to create custom Hook that is nothing but a simple Javascript function
//Requirements:
    //URL passed by any component
    //State variable to store the data fetched
    //State variable to store the error if API fetch failed
    //State variable to store the STATE of fetch() i.e. if data is not fetched and there is no error therefore there is a delay to display Loading during that delay
    //useEffect to render the component once with available data, until API call is successful
    import { useState, useEffect } from "react";



    export function useCustomFetch(url,options){
        //simple function which takes url
    
        //State Variables
            //initially data is null
            const [fetchedData, setFetchedData] = useState(null);
    
            //initially error is null
            const [err, setError] = useState(null);
    
            //initially data is being fetched, therefore loading process TRUE
            const [isLoading , setIsLoading] = useState(true);
    
        //making API call in useEffect
        useEffect(()=>{
            //in callback of useEffect, creating a helper function with async keyword
            //
            const fetchData = async () => {
                //"async and await make promises easier to write"
                    //async makes a function return a Promise
                    //await makes a function pause until promise is resolved
                //Since fetch API returns a promise object using async-await
    
                try{
                 //try =>if successful to fetch data
                    const response = await fetch(url,options); //fetch call and get response
                    const result = await response.json(); //convert it to json
                    setFetchedData(result) //set the data in State variable
                }catch(error){
                    //catch => if not successful to fetch data, get error and store it in error state variable
                    setError(error);
                }finally{
                    //finally => indication that all the fetch process is completed
                    setIsLoading(false); //if all process is done set Loading to false
                }
                 
            }
    
            fetchData(); //call this async function inside the useEffect 
    
            //passing url as dependency, whenever url updates, make API call
        },[url]);

        
    
        return {fetchedData, err , isLoading}; //returning all the state variables as result
        //Now import this Hook inside any component
    
}