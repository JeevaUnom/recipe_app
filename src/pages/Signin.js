
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope,  faKey, faPersonCircleCheck, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons"
import validation from "./Signupvalidation"
import React, { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { GoogleLogin, GoogleLogout } from 'react-google-login';

 export default function Signin(){
    
        const [values, setValues] = useState({
          name : '',  
          email : '',
          password : '',
          confirm : ''
        })
       
        const Navigate = useNavigate();
       const [errors, setErrors] = useState({})
       
       const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name] : [event.target.value]}))
       }

       const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        if(errors.name ==="" && errors.email ==="" && errors.password ==="" && errors.confirm ===""){
          axios.post('http://localhost:8081/signup',values)
          .then(res => {
            Navigate('/Recipes');
          })
          .catch(err => console.log(err));
        }
       }
  
       const NavigateSigin = () =>
       {
        
        window.location.href = "/login"; 

       }

       const handleLoginSuccess = (response) => {
        console.log('Login Success:', response);
      };
    
      const handleLogoutSuccess = () => {
        console.log('Logout Success');
      };
    
      const handleLoginFailure = (error) => {
        
        console.log('Login Failure:', error);
        
      };
    
      const handleLogoutFailure = (error) => {
        console.log('Logout Failure:', error);
      };
  
    return (
        <div className="log-container">
         <center>
            <h2> <u>Sign up Page</u></h2><br></br>
            <hr></hr>
            <br></br>

            <div>
          <h4>Google Sign-In:</h4>
          <GoogleLogin
            clientId="869829290628-l0dvjfhraj3ablg1qh7meag6rmkgk8mt.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            cookiePolicy="single_host_origin"
          />
          <GoogleLogout
            clientId="869829290628-l0dvjfhraj3ablg1qh7meag6rmkgk8mt.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={handleLogoutSuccess}
            onFailure={handleLogoutFailure}
          />
        </div>
      <br></br>
      <h5>OR</h5>
      <br></br>
            <form className="login-form" onSubmit={handleSubmit}>

            <div className="search-box">
            <FontAwesomeIcon className="icon" icon={faPersonCircleCheck} />
            <input type="text" onChange={handleInput} value={values.name} name="name" placeholder="Enter your Username.." /><br></br>
            {errors.name && <span className="text-danger">{errors.name}</span>}<br></br>
            </div>

            <div className="search-box">
            <FontAwesomeIcon className="icon" icon={faEnvelope} />
            <input type="email" onChange={handleInput} value={values.email} name="email" placeholder="Enter your mail.." /><br></br>
            {errors.email && <span className="text-danger">{errors.email}</span>}<br></br>
            </div>

            <div className="search-box">
            <FontAwesomeIcon className="icon" icon={faKey} />
            <input type="password" onChange={handleInput} value={values.password} name="password" placeholder="Enter your password.."  /><br></br>
            {errors.password && <span className="text-danger">{errors.password}</span>}<br></br>
            </div>

            <FontAwesomeIcon className="icon" icon={faKey} />
            <input type="password" onChange={handleInput} value={values.confirm} name="confirm" placeholder="Renter your password.."  /><br></br>
            {errors.confirm && <span className="text-danger">{errors.confirm}</span>}<br></br>

            <button className="btn" type="submit"> Sign In  <FontAwesomeIcon icon={faArrowCircleRight} /></button><br></br><br></br>
            </form>
            <h4> Already Signed up?</h4><br></br>
            <h4>Or</h4><br></br>
            <button className="btn" onClick={NavigateSigin}>Login  <FontAwesomeIcon icon={faArrowCircleRight} /></button><br></br>
            <br></br><hr></hr>

            
         </center>
        </div>
    )
}