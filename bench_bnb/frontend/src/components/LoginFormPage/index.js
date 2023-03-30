import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential,setCredential] = useState('');
    const [password,setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    
    if (sessionUser) return <Redirect to="/"/>;
    // debugger
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
         dispatch(sessionActions.login({credential,password}))
        .catch(async (res) =>{
            const data = await res.json();
            if (data.errors) setErrors(data.errors);
            // let data;
            // try{
            //     data = await res.clone().json();
                
            // }catch{
            //     data = await res.text();
            // }
            // if (data?.errors){setErrors(data.errors)}   
            // else if (data){setErrors([data])}
            // else{setErrors([res.statusText])}
         
        });
    }
    // debugger
    return(
        <form className="login" onSubmit = {handleSubmit}>
        <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
     
            <input type="text" value = {credential} onChange = {(e)=>setCredential(e.target.value)}
             placeholder = 'Username or Email' required/>
    
            <input type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)}
            placeholder = "Password" required/>
  
        <button type="submit">Log In</button>
    </form>
    );
}

export default LoginFormPage