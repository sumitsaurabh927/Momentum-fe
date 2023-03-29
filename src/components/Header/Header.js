import React,{useCallback, useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./header.css";
import decode from "jwt-decode";
import {toast} from "react-toastify";

const Header = () => {
    const [theme,setTheme]=useState(false);
    const [user,setUser]=useState(JSON.parse(localStorage.getItem("profile")));

    const navigate=useNavigate();
    const location=useLocation();
    const dispatch=useDispatch();

    const handleLogout = useCallback(() =>{
        dispatch({type:"LOGOUT"});
        navigate("/");
        toast.success("logged out successfully");
    },[dispatch,navigate]);

    useEffect(()=>{
        const token=user?.token;
        if(token){
            const decodedToken=decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }
        setUser(JSON.parse(localStorage.getItem("profile")))
    },[user?.token,handleLogout,location]);

    const handleLogin = () => {
        navigate("/")
    }

    const themeHandeler=()=>{
        setTheme((prev)=>!prev);
        document.body.classList.toggle("dark-mode");
    }
  return (
    <header className="header">
        <div className="header_container">
            <div className="header_left">
                <Link to="/">
                    <h3 className="header_brand">Momentum</h3>
                </Link>
            </div>
            <div className="header_right">
            {user?(
                    <>
                        <span>{user?.result?.name}</span>
                        <button className="header_button" onClick={handleLogout}>Logout</button>
                    </>
                ):(
                    <button className='header_button' onClick={handleLogin}>Login</button>
                )}
                <button onClick={themeHandeler} className="header_theme_button" style={{backgroundColor: theme ? "#fff" :"#000", color: theme ? "#000":"#fff"}}>{theme?"Light":"Dark"}</button>
            </div>
        </div>
    </header>
  )
}

export default Header
