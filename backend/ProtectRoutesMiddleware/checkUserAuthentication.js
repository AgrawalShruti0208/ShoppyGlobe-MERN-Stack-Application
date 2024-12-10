// middleware file to verify the token client enters to access the application 

import jwt from 'jsonwebtoken'; //importing jwt Token library package

export function checkUserAuthentication(req,res,next){
    //verifying token using jwt.verify(receivedToken,secretKeyUsedToCreateToken)
        //returns decodedPayload if successful

        //this will give error if failed to verify
        try{
                //retrieving value for Authorization key in Headers section of request
                const authorizationHeader = req.headers['authorization']; 
                    
        
                //retrieving token from this value by splitting it and getting second part IF IT EXISTS
                const tokenPassedByClient = authorizationHeader && authorizationHeader.split(" ")[1];
                //received token
    
            const decodedPayload = jwt.verify(tokenPassedByClient, process.env.JWT_KEY);
            //If verification successful
                //add this decodedPayload i.e. user information: id and email to the req using this middleware so that this information can be used afterwards
                req.userData = decodedPayload;
                console.log(`
                    --------------------------------------------------------------------------------------------------------------------------------------------------
                                                User Authentication Successful, User is Now LoggedIn!.
                    --------------------------------------------------------------------------------------------------------------------------------------------------`);
                    
                next(); //pass the control to the next middleware or controller
            
        }catch(error){
            //If failed to VERIFY TOKEN
                console.log(`
                --------------------------------------------------------------------------------------------------------------------------------------------------
                                            User Authentication Failed, Login Unsuccessful!.
                --------------------------------------------------------------------------------------------------------------------------------------------------`);
                             
                return res.status(401).json('User Authentication Failed, You cannot login!');
        }
        

}