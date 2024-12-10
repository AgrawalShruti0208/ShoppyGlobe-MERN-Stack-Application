import { registerUser,loginUser } from "../Controller/users.controller.js"

export function UserRoutes(app){
    //route for registering the user that is saving the email and password received from user to the database
    app.post("/register",registerUser);

    //route for user to enter the email and password they used for registering,
        //and If the email and password matches with the entry in the database, generate JWT Token and send it to user
    app.post("/login",loginUser);
}



/**Steps followed For /register route :to register user and save the details in Database
 * 
 * Step1: Create Model : Schema - email and password, ensuring proper format for email
 * Step2: Add Route to server and create controller
 * Step3: Add route here and import the function from corresponding controller
 * Step4: import Model in controller
 * Step5: registerUser function to add user to Database after validating inputs and performing operations on them like hashing the password, checking for unique email
 * Ste6: test the api
 * NEXT STEP: Create login route and do check for email and password, and on successful authentication return JWT Token 
 */


/**Steps followed For /login route :If the email and password entered matches with the entry in the database, generate JWT Token and send it to user 
 * Step1: Create function in controller and import it in the Routes
 * Step2: Add route here with the function 
 * Step3: In controller, in function
    * Step1: Check for the email, user with same email exists or not, If Exists continue Else Return Error
    * Step2: Check for Password now with compare method of password hashing package, If not matches throw error
    *           If Password also matched,
    *           Create JWT Token using jsonwebtoken library package 
    *               const Token =jwt.sign({payload:Objectid from MongoDB,password},secretKey from nodemon.json as environment variable,{expiresIn})
    *           Return this token along with a Login successful message to the user as respond
    * Now User will have to make request with this access token to access the protected routes
    *NEXT STEP: Will verify this token now, and then protect the routes
*/
