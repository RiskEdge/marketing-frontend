import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const LoginForm = () => {
	// Define validation schema
	const validationSchema = Yup.object({
		username: Yup.string().required('Email is required'),
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
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='bg-white p-6 rounded shadow-md w-full max-w-md'>
				<h2 className='text-2xl font-semibold text-center mb-6'>Login</h2>
				<Formik
					initialValues={{ username: '', password: '' }}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}>
					{() => (
						<Form className='space-y-4'>
							<div>
								<label
									htmlFor='username'
									className='block text-sm font-medium text-gray-700'>
									Username
								</label>
								<Field
									type='text'
									id='username'
									name='username'
									// value={username}
									placeholder='Enter your username'
									className='mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-200'
								/>
								<ErrorMessage
									name='username'
									component='div'
									className='text-red-500 text-sm mt-1'
								/>
							</div>

							<div>
								<label
									htmlFor='password'
									className='block text-sm font-medium text-gray-700'>
									Password
								</label>
								<Field
									type='password'
									id='password'
									// value={password}
									name='password'
									placeholder='Enter your password'
									className='mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-200'
								/>
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
	);
};

export default LoginForm;
