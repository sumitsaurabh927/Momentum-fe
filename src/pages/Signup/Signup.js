import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../Login/login.css";
import { useDispatch } from 'react-redux';
import { signup } from '../../actions/auth';

const Signup = () => {
    const [formValue,setFormValue]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",    
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setFormValue({
            ...formValue,
            [e.target.name]:e.target.value,
        })
      
    }

    const handleFormSubmit=(e)=>{
      e.preventDefault();
      dispatch(signup(formValue,navigate));
    }
  
  return (
    <div className='auth_container'>
          <form onSubmit={handleFormSubmit} className="auth_form">
            <div className="auth_sub_container">
              <label for="firstname" >FirstName</label>
              <label for="lastname" >LastName</label>
            </div>
          <div className='auth_sub_container'>
            <input 
              type="text" 
              className="auth_input"
              id="firstname" 
              value={formValue.firstName} 
              name="firstName" 
              onChange={handleChange} 
              placeholder="Firstname" 
            />
            <input 
              type="text" 
              className="auth_input"
              id="lastname" 
              value={formValue.lastName} 
              name="lastName" 
              onChange={handleChange} 
              placeholder="Lastname" 
            />
          </div>
            <label for="email" >Email</label>
            <input 
              type="text" 
              className="auth_input"
              id="email" 
              value={formValue.email} 
              name="email" 
              onChange={handleChange} 
              placeholder="Enter Your Email" 
            />
            <label for="password">Password</label>
            <input 
              type="password" 
              className="auth_input"
              id="password" 
              value={formValue.password} 
              name="password"
              onChange={handleChange} 
              placeholder="Enter Your Password" 
            />
            <label for="confirmpassword" >ConfirmPassword</label>
            <input 
              type="text" 
              className="auth_input"
              id="confirmpassword" 
              value={formValue.confirmPassword} 
              name="confirmPassword" 
              onChange={handleChange} 
              placeholder="Re-Enter you password" 
            />
            <div className="auth_button_container">
              <button className="auth_button" disabled={!(formValue.email && formValue.password)}>Signup</button>
            </div>
            <Link to="/">
              <p>Already have an account? Login here</p>
            </Link>
          </form>
      </div>

  )
}

export default Signup