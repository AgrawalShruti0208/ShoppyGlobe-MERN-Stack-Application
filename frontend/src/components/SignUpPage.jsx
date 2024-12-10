import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './StyleSheets/StyleLoginSignup.css'

export function SignUpPage(){

    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [err,setError] = useState('');
    const [apiResult,setApiResult] = useState('');
    const [apiResultDisplay, setApiResultDisplay] = useState({

        image: "",
        instruction:""

    })
    const navigateTo = useNavigate();

    function handleLogin(){
        navigateTo('/UserLogin');
    }

    function validateEmail(email) {

        const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    
        return emailPattern.test(email);
        
    }

    

    function handleSignUp(e){
        e.preventDefault();
        
        if(validateEmail(email)){
            if(!err){
                
                const registerUserObj = {
                    email:email,
                    password:password
                }
                fetch("https://shoppyglobe-mern-stack-application.onrender.com/register",{
                    //as browser only accepts fetch API using its options{} to pass the email and password to the Request Body
                    method:'post',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(registerUserObj) //sending User Data to post rquest body after convrting it into json()
        
                }).then(response=>response.json()).then((data)=>{
                    console.log(data);
                    const result = (data.message)? data.message : data.error;
                    
                    setApiResult(result);
                    console.log("User Sign Up API Result:",result);

                    if(result ==='User with this Email ID Exists!'){
                        
                        setApiResultDisplay({
                            ...apiResultDisplay,
                            image: "/Mail_Exists.gif",
                            instruction:"Please Sign Up using different Email ID or Login"
                        });

                    }else if(result ==='Registration Successful!'){
                        
                        setApiResultDisplay({
                            ...apiResultDisplay,
                            image: "/User_Created.gif",
                            instruction:"Please Login to your account!"
                        });

                    }else{
        
                        setApiResultDisplay({
                            ...apiResultDisplay,
                            image: "/Error.gif",
                            instruction:"Error: Registration Failed! Please Sign In Again."
                        });
                    }

                    
                    
                });
                setEmail("");
                setPassword("");
    
            }
        }else{
            setError('Please enter a valid email address!');
        }
    
          

    }

    function handleEmail(evt){
        const value = evt.target.value;

        // Validate if the input is not empty
        if (!value.trim()) {
            setError('Input Required for all Inputs!');
        }else {
            setError('');
            setEmail(value);
        }
        
    }
    function handlePassword(evt){
        const value = evt.target.value;

        // Validate if the input is not empty
        if (!value.trim()) {
            setError('Input Required for all Inputs!');
        } else {
            setError('');
            setPassword(value);
        }
        
    }

    return(
    <div className='LoginSignupContainer'>
        {!apiResult && 
            <form className="container" onSubmit={handleSignUp}>
                <div className="header">
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>
                </div>  
                <div className="inputs">
                    
                    <div className="input">
                        <img src="/email.png" alt="email icon" />
                        <input type="email" name='email' value={email} placeholder='Enter your Email ID' required onChange={handleEmail} />
                    </div>
                    <div className="input">
                        <img src="/password.png" alt="password icon" />
                        <input type="password" name='password' value={password} placeholder='Enter your Password' required onChange={handlePassword} />
                    </div>
                </div>
                {err && <p className="Error">{err}</p>}

                <div className="submit-container">
                    <button className="submit" type="submit">Sign Up</button>
                </div>
            </form>
        }
        {apiResult && 
            <div className="container">
                <div className="inputs">
                    <div className="input">
                        <img src={apiResultDisplay.image} alt="Icon for Registration result" width="27%" />
                        <input value={apiResult} readOnly/>
                    </div>
                    <p className="ApiInstruction">{apiResultDisplay.instruction}</p>
                    <div className="submit-container">
                        
                        {(apiResult==='User with this Email ID Exists!') &&
                            <button className="submit" onClick={()=>location.reload()}>Sign Up</button>
                        }
                        
                        {(apiResult==='Registration Successful!' || apiResult==='User with this Email ID Exists!')&&
                            <button className="submit" onClick={handleLogin}>Login</button>
                            
                        }
                        
                        { !['Registration Successful!', 'User with this Email ID Exists!'].includes(apiResult) && <button className="submit" onClick={()=>location.reload()}>Sign Up</button> }
                       

                    </div>
                </div>
            </div>
        }  
    </div>
    );

}