import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import loginImg from "../assets/images/loginImg.png";

const LoginForm = () => {
	// Define validation schema
	const validationSchema = Yup.object({
		username: Yup.string().required('User Name is required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Password is required'),
	});

	const [isAuthenticated, setIsAuthenticated] = useAuth();

	const navigate = useNavigate();

	const handleSubmit = (values) => {
		console.log(values);

		if (
			values.username === import.meta.env.VITE_APP_USERNAME &&
			values.password === import.meta.env.VITE_APP_PASSWORD
		) {
			setIsAuthenticated(true);
			localStorage.setItem('auth', true);
			navigate('/');
		} else {
			alert('Invalid username or password');
			setIsAuthenticated(false);
		}
	};

	return (
        <div className=' bg-gray-200 w-full min-h-screen  flex items-center justify-center p-5 py-24'>
          <div className='bg-white max-w-3xl mx-auto w-full rounded-3xl shadow-md grid grid-cols-2 p-8 gap-5'>
              <div className='p-4 col-span-2 md:col-span-1 flex items-center justify-center'>
              <img src={loginImg} className='max-w-80 sm:max-w-xs' alt="" />
            </div>
            <div className="my-5 col-span-2 md:col-span-1 max-w-sm mx-auto w-full bg-white   p-4">
              <h3 className='text-center  text-2xl lg:text-4xl font-bold mb-8'>Login</h3>
              <div className='error text-center'>
                    {/* <p className='text-red-400 mt-3'>{isError && errorMsg}</p> */}
                </div>
				<Formik
					initialValues={{ username: '', password: '' }}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}>
					{() => (
						<Form className='space-y-8'>
							<div className='flex flex-col gap-3'>
							<div className='relative shadow-md w-full'>
								<Field
									type='text'
									id='username'
									name='username'
									// value={username}
									placeholder=''
									 className="block px-2.5 pb-2.5 pt-4 w-full text-sm  outline-none text-black border bg-transparent shadow-md rounded-none border-1 border-gray-500 appearance-none  peer"
								/>
								<label
									htmlFor='username'
									className='absolute text-sm text-gray-800 duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:bg-white peer-focus:text-black font-semibold  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'>
									Username
								</label>
								
							</div>
								<ErrorMessage
									name='username'
									component='div'
									className='text-red-500 text-sm mt-1'
								/>
							</div>

							<div className='flex flex-col gap-3'>
							<div className='relative shadow-md w-full '>
								
								<Field
									type='password'
									id='password'
									// value={password}
									name='password'
									placeholder=''
									className="block px-2.5 pb-2.5 pt-4 w-full text-sm  outline-none text-black border bg-transparent shadow-md rounded-none border-1 border-gray-500 appearance-none  peer"
								/>
								<label
									htmlFor='password'
									className='absolute text-sm text-gray-800 duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:bg-white peer-focus:text-black font-semibold  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'>
									Password
								</label>
							</div>
							<ErrorMessage
									name='password'
									component='div'
									className='text-red-500 text-sm mt-1'
								/>
							</div>

							<button
								type='submit'
								className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'>
								Login
							</button>
						</Form>
					)}
				</Formik>
              
            </div>
          </div>
      
    </div>
	);
};

export default LoginForm;
