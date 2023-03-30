import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = ()=>{
    const sessionUser = useSelector(state =>state.session.user);
    let sessionLinks;

    if(sessionUser){
        sessionLinks = (
            <ProfileButton id ='profile' user = {sessionUser}/>
        )
    }else{
        sessionLinks = (
            <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to= "/signup">Sign Up</NavLink>
            </>
        );
    }


    return (
        <ul>
        <li className = 'navlink'>
            <NavLink exact to="/">Home</NavLink>
            {sessionLinks}
        </li>
        </ul>
    )
}

export default Navigation; 