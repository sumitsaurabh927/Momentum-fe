import React,{useCallback, useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./header.css";
import decode from "jwt-decode";
import {toast} from "react-toastify";
import {
    NovuProvider,
    PopoverNotificationCenter,
    NotificationBell,
} from '@novu/notification-center';



const Header = () => {
    const [theme,setTheme]=useState(localStorage.getItem("theme") === "dark");
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
        const newTheme = !theme;
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
        document.body.classList.toggle("dark-mode");
    }

    const handleNotificationClick = (message) => {
        if (message?.cta?.data?.url) {
          window.location.href = message.cta.data.url;
        }
    }

    useEffect(() => {
        if (theme) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [theme]);

  return (
    <header className="header">
        <NovuProvider 
            subscriberId={user?.result?._id} 
            applicationIdentifier={process.env.REACT_APP_NOVU_ID_FROM_ADMIN_PANEL}
            initialFetchingStrategy={{ fetchNotifications: true, fetchUserPreferences: true }}
        >
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
                            <PopoverNotificationCenter 
                                onNotificationClick={handleNotificationClick}
                                listItem={(notification) => {
                                    return (
                                      <div
                                        className='notification_container'
                                        style={{boxShadow : theme ? "0px 5px 10px rgba(236, 109, 109, 0.4)" : "0px 5px 10px rgba(0.1,0.5,0.5,0.1)"}}
                                      >
                                        <h3 style={{color: theme ? "#fff" :"#000"}}>{notification.payload.title}</h3>
                                        <p style={{color: theme ? "#fff" :"#000"}}>{notification.payload.description}</p>
                                      </div>
                                    );
                                  }}
                                colorScheme={theme ? 'dark' : 'light'}
                            >
                                {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
                            </PopoverNotificationCenter>
                        </>
                    ):(
                        <button className='header_button' onClick={handleLogin}>Login</button>
                    )}
                    <button onClick={themeHandeler} className="header_theme_button" style={{backgroundColor: theme ? "#fff" :"#000", color: theme ? "#000":"#fff"}}>{theme?"Light":"Dark"}</button>
                </div>
            </div>
        </NovuProvider>
    </header>
  )
}

export default Header
