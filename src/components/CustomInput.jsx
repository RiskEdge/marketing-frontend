import React from 'react'

const CustomInput = ({id,type,name,value,placeholder,label,onChange,onBlur,htmlFor,isError}) => {
  return (
        <div className='relative shadow-md w-full '>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur} 
                placeholder=''
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm  outline-none text-black border bg-transparent shadow-md rounded-none border-1 ${isError ? "border-red-600" : "border-gray-500"} appearance-none  peer`}
            />
            <label
                htmlFor={htmlFor}
                className={` ${isError ? "text-red-600" : "text-gray-800"} absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:bg-white peer-focus:text-black peer-focus:font-semibold font-normal  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>
                {label}
            </label>
            
        </div>
  )
}

export default CustomInput
