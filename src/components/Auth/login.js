import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import './login.css'
import Cookies from 'js-cookie'
import { Redirect } from "react-router-dom";

const Login =()=>{
    const {login}=useContext(AuthContext)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [showPass,setShowPassword]=useState(false)

    const onClickSubmit=async(event)=>{
        event.preventDefault()
        login({email,password})
        setEmail('')
        setPassword('')
    }

    const onChangeEmail=event=>{
        setEmail(event.target.value)
    }

    const onChangePassword=event=>{
        setPassword(event.target.value)
    }

    const onShowPassword=()=>{
        setShowPassword(!showPass)
    }

    const token=Cookies.get('jwtToken')
    if (token){
        return <Redirect to='/tasks'/>
    }

    return (
        <div className="login-container">
            <form onSubmit={onClickSubmit} className="login-form">
                <h1 className="login-heading">Login</h1>
                <div className="input-container">
                    <label htmlFor="email">ENTER EMAIL: </label>
                    <input className="input-el" type="email" id='email' value={email} onChange={onChangeEmail} placeholder="Enter Your Email" required/>
                </div> 
                <div className="input-container">   
                    <label htmlFor="password">ENTER PASSWORD: </label>
                    <input className="input-el" type={showPass?'text':'password'} id='password' value={password} onChange={onChangePassword} placeholder="Enter Your Password" required/>
                </div>
                <div className="text-container">
                    <div className="checkbox-container">
                        <input className="checkbox" id="checkbox" type="checkbox" onChange={onShowPassword}/>
                        <label htmlFor="checkbox">show password</label>
                    </div>
                        <p>Don't have an account:- <Link to='/register' className='register'>Sign Up
                        
                    </Link></p>
                </div>
                <button className="submit-btn" type="submit">Login</button>
            </form>
        </div>
    )

}
export default Login