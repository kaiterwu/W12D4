import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage(){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [errors,setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/"/>;

    const handleSubmit = (e) =>{
        e.preventDefault();

        if (password === confirmPassword){
            setErrors([]);
            return dispatch(sessionActions.signup({email,username,password}))
            .catch(async(res)=>{
                let data;
                try{
                    data = await res.clone().json();
                }catch{
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText])
            });
        }
        return setErrors (['Passwords are not the same'])
    };

    return(
        <form className = 'signup' onSubmit = {handleSubmit}>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
           
                
                <input type = "text" value = {email} onChange = {(e)=>setEmail(e.target.value)}
                placeholder = 'Email'required/>
            
        
                <input type = "text" value = {username} onChange = {(e)=>setUsername(e.target.value)}
                placeholder = 'Username'required/>
           

           
                
                <input type = "password" value = {password} onChange = {(e)=>setPassword(e.target.value)}
                placeholder = 'Password'required/>
           
               
                <input type = "password" value = {confirmPassword} onChange = {(e)=>setConfirmPassword(e.target.value)}
                placeholder = 'Confirm Password'required/>
            

            <button type = "submit">Sign Up</button>
        </form>
    );
}   

export default SignupFormPage
