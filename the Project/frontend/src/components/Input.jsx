import React from 'react'

const Input = ({ label, type, field, setField, placeholder }) => {
    const id = label.toLowerCase().replace(' ', '_');
    return (
        <div className='flex flex-col items-start w-full justify-center mb-4 cursor-pointer'>
            <label htmlFor={id} className='mb-2 cursor-pointer'>{label}</label>
            <input
                id={id}
                type={type}
                name= {label}
                value={field}
                onChange={(e) => setField(e.target.value)}
                placeholder={placeholder}
                className='border w-full h-10 p-2 focus:outline-none focus:border-cyan-500'
            />
        </div>
    )
}

export default Input