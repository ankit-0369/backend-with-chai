import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {

   const navItems= [
        {
            label: 'Home',
            url: '/'
        },
        {
            label: 'login',
            url: '/login'
        },
        {
            label: 'register',
            url: '/signup'
        }
   ] 
  return (
    <div className='w-full  flex flex-row  items-center justify-center border shadow-md bg-neutral-800 text-white'>
      <div className='flex items-center justify-center text-xl gap-10 p-4 w-full'>
      {navItems.map((item, index) => (
        <Link
        to={item.url}
        key={index}
        >
            <span>{item.label}</span>
        </Link>
      ))}
      </div>
    </div>
  )
}

export default Header
