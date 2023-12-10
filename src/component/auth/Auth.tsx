import React, { useState } from 'react'
import "./login.css"
import { Button } from 'antd';

import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
function Login() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
  const handleToggleForm = () => setIsLoginFormVisible(!isLoginFormVisible);

  return (
    <div className='outer-container-login'>
      <div className="inner-container-login">
        <div className="left-auth-details">
        <h1>Hive Social</h1>
        <p>Write, Like, comment, save Posts  </p>
        </div>
        
        <div className="right-auth-forms">
        {
          isLoginFormVisible ?
            <SignInForm />
            :
            <SignUpForm />

        }
        <div className="under-form" style={{ marginLeft: "auto", marginRight: "auto", marginTop: 10 }}>
        {isLoginFormVisible?
        <p> Dont have a account? sign up here</p>
        :
        <p> Have a account? </p>  
        }
        <p  onClick={handleToggleForm}  style={{ marginLeft: "auto", marginRight: "auto", marginTop: 5, textAlign:"center"}}>
          {isLoginFormVisible ? 'Create a account' : 'Log in'}
        </p>
        </div>
        
        </div>

        

      </div>


    </div>
  )
}

export default Login