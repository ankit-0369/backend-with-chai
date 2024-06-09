import React, { useState } from 'react'
import Input from '../components/Input'
import { Link } from 'react-router-dom'

const Register = () => {
    const [username, setUsername]= useState()
    const [password, setPassword]= useState()
    const [email, setEmail]= useState()
    const [showPassword, setShowPassword]= useState(false)

    const HandleSubmit= (e)=>{
        e.preventDefault()
    }

    return (
        <div className='w-full flex flex-col gap-10 justify-center items-center h-screen'>
            <div className='text-center text-4xl'>
                Register Now!!
            </div>
            <div className='w-2/5 h-auto border shadow-md flex'>
                <form className='w-full p-4' onSubmit={HandleSubmit}>
                    <Input
                        field={username}
                        label={'Username'}
                        placeholder={'john_doe'}
                        setField={setUsername}
                        type={'text'}
                        key={1}
                    />
                    <Input
                        field={email}
                        label={'Email'}
                        placeholder={'johndoe@gmail.com'}
                        setField={setEmail}
                        type={'text'}
                        key={2}
                    />
                    <Input
                        field={password}
                        label={'Password'}
                        placeholder={'Enter the Password'}
                        setField={setPassword}
                        key={3}
                        type={showPassword ? 'text' : 'password'}
                    />


                    <div className='w-full flex justify-between items-center'>
                        <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded'>
                            Signup
                        </button>
                        <Link to="/login" className='text-blue-500 hover:underline'>
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
