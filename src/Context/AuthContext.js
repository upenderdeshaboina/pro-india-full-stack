import {createContext,useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export const AuthContext=createContext();

const AuthProvider=({children})=>{
    const [token,setToken]=useState(null)
    const [user,setUser]=useState(null)


    const login=async(credentials)=>{
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(credentials)
        }
        const response=await fetch('https://pro-india-backend.onrender.com/auth/login',options)
        const jsonData=await response.json()
        // console.log(jsonData.token)
        // const userD=jsonData.user
        if (response.ok){
            setToken(jsonData.token)
            setUser(jsonData)
            Cookies.set('jwtToken',jsonData.token,{expires:24}) 
        }else{
            alert(jsonData.message)
        }       
    }

    const register=async(userData)=>{
        try {
            const response=await axios.post('https://pro-india-backend.onrender.com/auth/register',userData);
            if (response.statusText==='Created'){
                alert('user created go to login page')
            }else{
                console.log(response)
            }
        } catch (error) {
            console.log('Registration failed',error.response.data)
            alert('user already exists with this email')
        }
    }
    const logout=()=>{
        setToken(null)
        setUser(null)
        Cookies.remove('jwtToken')
    }
    return (
        <AuthContext.Provider value={{token,user,login,register,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider