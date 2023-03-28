import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import "./header.css";

const Header = () => {
    const [theme,setTheme]=useState(false);

    const clickHandeler=()=>{
        setTheme((prev)=>!prev);
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
                <button onClick={clickHandeler} className="header_button">{theme?"Light":"Dark"}</button>
            </div>
        </div>
    </header>
  )
}

export default Header
