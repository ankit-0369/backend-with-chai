import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/Input'
import axios from 'axios'

const Login = () => {

    const [email, setEmail]= useState()
    const [password, setPassword]= useState()
    const [rememberMe, setRememberMe]= useState(false)
    const [error, setError]= useState('')
    const HandleSubmit= (e)=>{
        e.preventDefault();
        if(validataForm()){
            loginUser();
        }
    }

    const loginUser= async()=>{

       try {
         const response= await axios.post('/api/v1/users/login', {
             email,
             password
         })
         console.log(response)
       } catch (error) {
        // setError(error)
        console.log("Error while login :: ", error)
       }
    }

   const validataForm= ()=>{
    if(!email || !password){
        setError(`${!email && 'email'} ${!password && 'password'} is required`);
        return false;
    }
    setError('');
    return true;
   }
  return (
    <div className='w-full flex flex-col gap-10 justify-center items-center h-screen'>
    <div className='text-center text-4xl'>
        Login Now!!
    </div>
    <div className='w-2/5 h-auto border shadow-md flex'>
        <form className='w-full p-4' onSubmit={HandleSubmit}>
            <Input
                field={email}
                label={'Email or Username'}
                placeholder={'Enter the Email or Username'}
                setField={setEmail}
                type={'text'}
                key={1}
            />
            <Input
                field={password}
                label={'Password'}
                placeholder={'Enter the Password'}
                setField={setPassword}
                key={2}
            />
            <div className='flex items-center mb-4'>
                <input
                    type="checkbox"
                    name='rememberMe'
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className='mr-2 focus:outline-none focus:border-cyan-500'
                />
                <label htmlFor="rememberMe">Remember Me</label>
            </div>
           {error && <div className='text-red-600 text-lg'>{error}</div>}
            <div className='w-full flex justify-between items-center'>
                <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded'>
                    Login
                </button>
                <Link to="/signup" className='text-blue-500 hover:underline'>
                    Sign Up
                </Link>
            </div>
        </form>
    </div>
</div>
  )
}

export default Login
