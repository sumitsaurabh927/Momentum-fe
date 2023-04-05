// Importing necessary dependencies from React and other libraries
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./header.css";
import decode from "jwt-decode";
import { toast } from "react-toastify";
import {
    NovuProvider,
    PopoverNotificationCenter,
    NotificationBell,
} from '@novu/notification-center';


// Declaring a functional component named 'Header'
const Header = () => {
    // Initializing state variables using the 'useState' hook
    const [theme, setTheme] = useState(localStorage.getItem("theme") === "dark" || !localStorage.getItem("theme"));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    // Initializing constants using the 'useNavigate', 'useLocation', and 'useDispatch' hooks
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Defining a callback function to handle user logout

    const handleLogout = useCallback(() => {
        // Dispatching an action to update the state and navigate to the home page

        dispatch({ type: "LOGOUT" });
        navigate("/");
        // Displaying a success message using the 'toast' function from the 'react-toastify' library

        toast.success("logged out successfully");
    }, [dispatch, navigate]);

    // Defining a side effect that checks if the user's token has expired

    useEffect(() => {
        // Extracting the token from the user object

        const token = user?.token;
        if (token) {
            // Decoding the token to get the expiration time

            const decodedToken = decode(token);
            // Logging out the user if the token has expired

            if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }
        // Updating the user object stored in the local storage

        setUser(JSON.parse(localStorage.getItem("profile")))
    }, [user?.token, handleLogout, location]);

    // Defining a function to handle user login

    const handleLogin = () => {
        navigate("/")
    }
    // Defining a function to toggle the theme of the application

    const themeHandeler = () => {
        const newTheme = !theme;
        // Updating the theme state and storing it in the local storage

        setTheme(newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
        // Toggling the class of the 'body' element to update the theme of the application

        document.body.classList.toggle("dark-mode");
    }

    // Defining a function to handle notification clicks

    const handleNotificationClick = (message) => {
        if (message?.cta?.data?.url) {
            window.location.href = message.cta.data.url;
        }
    }

    // Defining a side effect to update the theme of the application
    useEffect(() => {
        if (theme) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [theme]);

    // Rendering the header component with necessary components from the 'notification-center' library

    return (
        <header className="header">
            <NovuProvider
                subscriberId={user?.result?._id}
                applicationIdentifier={process.env.REACT_APP_NOVU_ID_FROM_ADMIN_PANEL}
                initialFetchingStrategy={{ fetchNotifications: true, fetchUserPreferences: true }}
            >
                <div className="header_container">
                    <div className="header_left">
                        <Link to="#">
                            <h3 className="header_brand">MoonShine</h3>
                        </Link>
                    </div>
                    <div className="header_right">
                        {user ? (
                            <>
                                <button className="header_button" onClick={handleLogout}>Logout</button>
                                <PopoverNotificationCenter
                                    onNotificationClick={handleNotificationClick}
                                    listItem={(notification) => {
                                        if(notification.payload.message === "created"){
                                            return (
                                                <div
                                                    className='notification_container'
                                                    style={{ boxShadow: theme ? "0px 5px 10px rgba(236, 109, 109, 0.4)" : "0px 5px 10px rgba(0.1,0.5,0.5,0.1)" }}
                                                >
                                                    <span style={{ color: theme ? "#fff" : "#000" }}>{`${notification.payload.message} Todo`}</span>
                                                    <h3 style={{ color: theme ? "#fff" : "#000" }}>{notification.payload.title}</h3>
                                                    <p style={{ color: theme ? "#fff" : "#000" }}>{notification.payload.description}</p>
                                                </div>
                                            );
                                        }else if(notification.payload.message === "deleted"){
                                            return (
                                                <div
                                                    className='notification_container'
                                                    style={{ boxShadow: theme ? "0px 5px 10px rgba(236, 109, 109, 0.4)" : "0px 5px 10px rgba(0.1,0.5,0.5,0.1)" }}
                                                >
                                                    <span style={{ color: theme ? "#fff" : "#000" }}>{`${notification.payload.message} Todo`}</span>
                                                    <h3 style={{ color: theme ? "#fff" : "#000" }}>{notification.payload.title}</h3>
                                                    <p style={{ color: theme ? "#fff" : "#000" }}>{notification.payload.description}</p>
                                                </div>
                                            );
                                        }
                                    }}
                                    colorScheme={theme ? 'dark' : 'light'}
                                >
                                    {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
                                </PopoverNotificationCenter>
                            </>
                        ) : (
                            <button className='header_button' onClick={handleLogin}>Login</button>
                        )}
                        <button onClick={themeHandeler} className="header_theme_button" style={{ backgroundColor: theme ? "#fff" : "#000", color: theme ? "#000" : "#fff" }}>{theme ? "Light" : "Dark"}</button>
                    </div>
                </div>
            </NovuProvider>
        </header>
    )
}

export default Header
