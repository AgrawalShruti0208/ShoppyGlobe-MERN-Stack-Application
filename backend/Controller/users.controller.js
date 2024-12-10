import usersModel from "../Model/usersModel.js";

//installed and imported bcrypt : A library to help you hash passwords.
import bcrypt, { hash } from "bcrypt";

//installed and imported jsonwebtoken library to create JWT Token when user logs in successfully and return it to the user
import jwt from 'jsonwebtoken';



export function registerUser(req,res){
    //Before creating user, we need to ensure no same email get inserted as new entry
    usersModel.find({email:req.body.email})
            .exec()
            .then((user)=>{//user will be a array empty or not
                
                //To check if user exists we need to check length of the array, if length is greater than 0,then user exists
                if(user.length>=1){
                    // 409 : conflict
                    return res.status(409).json({
                        message:'User with this Email ID Exists!'
                    });
                }
                else{//else an empty array with length 0, i.e. user not found
                    //if no user found, that means we can continue
                        //to convert password to hash
                            //1st argument: the plain text to be converted into hash
                            //2nd argument: salt -number of rounds, random strings to be added with plain text for more secure hashing
                            bcrypt.hash(req.body.password,10)
                                .then((hash)=>{
                                    //If successful,create the user in User Model
                                    const newUser = new usersModel({
                                        email: req.body.email,
                                        password: hash
                                    });

                                    //Save the user after creating 
                                    newUser.save()
                                    .then((result)=>{
                                        //if successfully saved in database 
                                        console.log("User saved successfully");
                                        res.status(201).json({message:'Registration Successful!'});
                                    })
                                    .catch((err)=>{
                                        console.log("Error while saving user in database:",err);
                                        res.status(500).json({error:err});
                                    });
                                    
                                }).catch((err)=>{
                                    //If password cannot be hashed 
                                    return res.status(500).json({error:err});
                                });

                }
            });

    
    
}


//function to verify the user entered details with database entries,
    //if matched, creating JWT Token and sending it to user
export function loginUser(req,res){
   
    //checking if user exists or not with same email,
   usersModel.find({email:req.body.email})
   .exec()
   .then((user)=>{//will receive an array containing user if exists else empty array

        //checking for empty array,i.e. no user found
            if(user.length<1){
                //401:Unauthorized, as no user found with this email
                
                return res.status(401).json({
                    message:'User Authentication Failed!'
                });
            }
            console.log(process.env.JWT_KEY);

        //else non-empty array,i.e. user found with same email now check for password
            /*
                *To check a password:
                    // Load hashed password from your Database and compare it with received password from user as input
                        bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
                            // result = true or false
                        }); 
            */
                //req.body.password - user input
                //user[0] - the user found with email is inside array so retrieving the user object
                bcrypt.compare(req.body.password, user[0].password)
                .then((result)=>{//true or false
                    
                    if(result===true){

                        // creating jwt token -sign({payload json data to be passed inside token},secretKey).then() --this returns jwt token as string on success
                        const jwtToken=jwt.sign(
                                        {
                                            // Payload here will be user's email and its unique id from MongoDB
                                            userID: user[0]._id,
                                            email:user[0].email
                                        },
                                        process.env.JWT_KEY,//stored secret key in separate json file as environment variable
                                        {//options
                                            expiresIn:"10m" //expiresIn is used to define the timespan after which our JWT Token will expire to make the process more secure
                                        }

                        )
                       
                        console.log(`
--------------------------------------------------------------------------------------------------------------------------------------------------
                            User Logged In, Created JWT Token Succesfully.
--------------------------------------------------------------------------------------------------------------------------------------------------`);
                        return res.status(200).json({
                            message:'User Authentication Successful!',
                            token: jwtToken
                        });
                        

                    }else{
                        throw err; //throw error to be catched by .catch()
                        
                    }

                })
                .catch((err)=>{
                    console.log(`
--------------------------------------------------------------------------------------------------------------------------------------------------
                            User Authentication Failed, Login Unsuccessful!. 
--------------------------------------------------------------------------------------------------------------------------------------------------`);
                        
                    return res.status(401).json({
                        message: 'User Authentication Failed!'
                    });
                })

        
   })
   .catch((err)=>{
        //If password cannot be hashed 
        return res.status(500).json({error:err});
    });

}