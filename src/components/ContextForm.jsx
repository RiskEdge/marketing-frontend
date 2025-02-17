import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AgentResponse from '../components/AgentResponse';
import axios from 'axios';
import Loading from './Loading';
import Layout from './Layout';
import CustomInput from "../components/CustomInput"
import { useLocation } from 'react-router-dom';

// Validation schema using Yup
const validationSchema = Yup.object({
	company_name: Yup.string().required('Company name is required'),
	company_website: Yup.string()
		.url('Must be a valid URL')
		.required('Company website is required'),
	industry: Yup.string().required('Industry is required'),
	agent: Yup.string().required('Agent is required'),
	services: Yup.string(),
	competitors_context: Yup.string(),
	content_type: Yup.string(),
	additional_info: Yup.string(),
});

const ContextForm = ({ service = '', agent = '' }) => {
	const [output, setOutput] = useState({});
	const [haveResponse, setHaveResponse] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const submitFormData = async (formData) => {
		try {
			const agentInfo = JSON.parse(localStorage.getItem('agents'));

			if (agentInfo) {
				console.log('Agent info:', agentInfo);
			}

			const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}form-input`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log('Form submitted successfully:', response.data);
			setOutput(response.data);
			setIsLoading(false);
			setHaveResponse(true);
		} catch (error) {
			console.error(
				'Error submitting the form:',
				error.response ? error.response.data : error.message
			);
			throw error; // Re-throw the error for further handling if needed
		}
	};

	const formik = useFormik({
		initialValues: {
			company_name: localStorage.getItem('company_name') || '',
			company_website: localStorage.getItem('company_website') || '',
			industry: localStorage.getItem('industry') || '',
			agent: agent || localStorage.getItem('agent') || '',
			services: localStorage.getItem('services') || '',
			competitors_context: localStorage.getItem('competitors_context') || '',
			content_type: localStorage.getItem('content_type') || '',
			additional_info: localStorage.getItem('additional_info') || '',
		},
		validationSchema,
		onSubmit: async (values) => {
			try {
				setIsLoading(true);
				submitFormData(values);
				formik.resetForm();
			} catch (error) {
				alert('Failed to submit the form!');
			}
		},
	});

	const {pathname} = useLocation();

	const curPath = pathname.split("/")[2];
	
	
	

	useEffect(() => {
		Object.keys(formik.values).forEach((key) => {
			localStorage.setItem(key, formik.values[key]);
		});
	}, [formik.values]);

	if (haveResponse) {
		return output && <AgentResponse response={output} service={service} />;
	}
	return (
		<Layout>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<div className='w-full h-full formBg relative'>
					<div className='absolute w-full h-full bg-black opacity-50'>
					</div>
					<div className='py-20 px-6 z-10 flex w-full justify-center items-center'>
						
						<div className='max-w-xl w-full mx-auto z-10  bg-white py-8 p-3 shadow-xl rounded'>
							<h2 className='text-3xl font-bold mb-4 text-center'>Client Info</h2>
							<form onSubmit={formik.handleSubmit} className='space-y-8 md:px-8 px-4 py-3'>
								
								<div className="flex gap-5 w-full flex-col sm:flex-row">


									{/* Company Name */}
									<div className='flex flex-col gap-3 w-full'>
										{/* <label
											className='block text-sm font-medium text-gray-700/40'
											htmlFor='company_name'>
											Company Name
										</label>
										
										<input
											id='company_name'
											name='company_name'
											type='text'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.company_name}
											className={`mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
												formik.touched.company_name && formik.errors.company_name
													? 'border-red-500'
													: ''
											}`}
										/> */}
										<CustomInput 
											id='company_name'
											name='company_name'
											type='text'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.company_name}
											isError={formik.touched.company_name && formik.errors.company_name}
											htmlFor={"company_name"}
											label={"Company Name"}
										/>
										{formik.touched.company_name && formik.errors.company_name ? (
											<div className='text-red-500 text-xs'>
												{formik.errors.company_name}
											</div>
										) : null}
									</div>

									{/* Industry */}
									<div className='flex flex-col gap-3 w-full'>
										{/* <label
											className='block text-sm font-medium text-gray-700/40'
											htmlFor='industry'>
											Industry
										</label>
										<input
											id='industry'
											name='industry'
											type='text'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.industry}
											className={`mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
												formik.touched.industry && formik.errors.industry
													? 'border-red-500'
													: ''
											}`}
										/> */}

										<CustomInput 
											id='industry'
											name='industry'
											type='text'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.industry}
											label={"Industry"}
											htmlFor={"industry"}
											isError={formik.touched.industry && formik.errors.industry}
										/>


										{formik.touched.industry && formik.errors.industry ? (
											<div className='text-red-500 text-xs'>
												{formik.errors.industry}
											</div>
										) : null}
									</div>


								</div>

								{/* Company Website */}
								<div className='flex flex-col gap-3'>
									{/* <label
										className='block text-sm font-medium text-gray-700/40'
										htmlFor='company_website'>
										Company Website
									</label>
									<input
										id='company_website'
										name='company_website'
										type='url'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.company_website}
										className={`mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
											formik.touched.company_website &&
											formik.errors.company_website
												? 'border-red-500'
												: ''
										}`}
									/> */}
									<CustomInput 
										id='company_website'
										name='company_website'
										type='url'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.company_website}
										label={"Company Website"}
										htmlFor={"company_website"}
										isError={formik.touched.company_website && formik.errors.company_website}
									/>
									{formik.touched.company_website && formik.errors.company_website ? (
										<div className='text-red-500 text-xs'>
											{formik.errors.company_website}
										</div>
									) : null}
								</div>

								

								{/* Services */}
								<div className='flex flex-col gap-3'>
									{/* <label
										className='block text-sm font-medium text-gray-700/40'
										htmlFor='services'>
										Services (Optional)
									</label>
									<input
										id='services'
										name='services'
										type='text'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.services}
										className='mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/> */}

									<CustomInput 
										id='services'
										name='services'
										type='text'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.services}
										htmlFor={'services'}
										label={'Services(Optional)'}

									/>

								</div>

								<div className="flex gap-5 w-full flex-col sm:flex-row">
									{/* Action */}
									<div className='flex flex-col gap-3 w-full'>
										{/* <label
											className='block text-sm font-medium text-gray-700/40'
											htmlFor='agent'>
											What do you want to do today?
										</label> */}
										{/* <select
											id='agent'
											name='agent'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.agent}
											className={`mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
												formik.touched.agent && formik.errors.agent
													? 'border-red-500'
													: ''
											}`}> */}
											{/* <option value={agent}>{service}</option>{' '}
											
											<option value='marketing_analyst'>Marketing Analysis</option>
											<option value='SEO_specialist'>
												Search Engine Optimization
											</option>
											<option value='content_creator'>Content Creation</option>
										</select> */}
										<div className='relative shadow-md w-full '>
											<select
												id='agent'
												name='agent'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.agent}
												className={`block px-2.5 pb-2.5 pt-4 w-full text-sm  outline-none text-black border bg-transparent shadow-md rounded-none border-1 ${formik.touched.agent && formik.errors.agent ? "border-red-600" : "border-gray-500"} appearance-none  peer`}
											>
												<option value={agent}>{service}</option>{' '}
												{/* Default option with empty value */}
												<option value='marketing_analyst'>Marketing Analysis</option>
												<option value='SEO_specialist'>
													Search Engine Optimization
												</option>
												<option value='content_creator'>Content Creation</option>
											</select>
											<label
												htmlFor="agent"
												className={`absolute text-sm ${formik.touched.agent && formik.errors.agent ? "text-red-600" : "text-gray-800"} duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:bg-white peer-focus:text-black font-semibold  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>
												What do you want to do today?
											</label>
										
									</div>


										{formik.touched.agent && formik.errors.agent ? (
											<div className='text-red-500 text-xs'>
												{formik.errors.agent}
											</div>
										) : null}
									</div>

									{/* Content Type */}
									{formik.values.agent ==="content_creator" && 
									
									<div className='flex flex-col gap-3 w-full'>
										{/* <label
											className='block text-sm font-medium text-gray-700/40'
											htmlFor='agent'>
											What do you want to do today?
										</label> */}
										{/* <select
											id='agent'
											name='agent'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.agent}
											className={`mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
												formik.touched.agent && formik.errors.agent
													? 'border-red-500'
													: ''
											}`}> */}
											{/* <option value={agent}>{service}</option>{' '}
											
											<option value='marketing_analyst'>Marketing Analysis</option>
											<option value='SEO_specialist'>
												Search Engine Optimization
											</option>
											<option value='content_creator'>Content Creation</option>
										</select> */}
										<div className='relative shadow-md w-full '>
											<select
												id='content_type'
												name='content_type'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.content_type}
												className={`block px-2.5 pb-2.5 pt-4 w-full text-sm  outline-none text-black border bg-transparent shadow-md rounded-none border-1 ${formik.touched.agent && formik.errors.agent ? "border-red-600" : "border-gray-500"} appearance-none  peer`}
											>
												<option value=''>Select content form</option>
												{/* Default option with empty value */}
												<option value='LinkedIn post'>Linked Post</option>
												<option value='Instagram post'>Instagram Post</option>
												<option value='Twitter post'>Twitter Post</option>
											</select>
											<label
												htmlFor="content_type"
												className={`absolute text-sm ${formik.touched.agent && formik.errors.agent ? "text-red-600" : "text-gray-800"} duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:bg-white peer-focus:text-black font-semibold  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>
												Content Type
											</label>
										
									</div>


									{formik.touched.content_type && formik.errors.content_type ? (
											<div className='text-red-500 text-xs'>
												{formik.errors.content_type}
											</div>
										) : null}
									</div>


									// <div className='flex flex-col gap-3'>
									// 	<label
									// 		className='block text-sm font-medium text-gray-700/40'
									// 		htmlFor='content_type'>
									// 		Content Type
									// 	</label>
									// 	<select
									// 		id='content_type'
									// 		name='content_type'
									// 		onChange={formik.handleChange}
									// 		onBlur={formik.handleBlur}
									// 		value={formik.values.content_type}
									// 		className={`mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
									// 			formik.touched.agent && formik.errors.agent
									// 				? 'border-red-500'
									// 				: ''
									// 		}`}>
									// 		<option value=''>Select content form</option>
									// 		{/* Default option with empty value */}
									// 		<option value='LinkedIn post'>Linked Post</option>
									// 		<option value='Instagram post'>Instagram Post</option>
									// 		<option value='Twitter post'>Twitter Post</option>
									// 	</select>
									// 	{formik.touched.content_type && formik.errors.content_type ? (
									// 		<div className='text-red-500 text-xs'>
									// 			{formik.errors.content_type}
									// 		</div>
									// 	) : null}
									// </div>
									
									}

								</div>

							
								{/* Competitors Context */}
								{curPath==="marketing-analysis" &&  <div className='flex flex-col gap-3'>
									{/* <label
										className='block text-sm font-medium text-gray-700/40'
										htmlFor='competitors_context'>
										Competitors Context
									</label>
									<input
										id='competitors_context'
										name='competitors_context'
										type='text'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.competitors_context}
										className='mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/> */}
									<CustomInput
										id='competitors_context'
										name='competitors_context'
										type='text'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.competitors_context}
										htmlFor={'competitors_context'}
										label={'Competitors Context'}
										
									/>
								</div>}

								

								{/* Additional Info */}
								<div className='flex flex-col gap-3'>
									{/* <label
										className='block text-sm font-medium text-gray-700/40'
										htmlFor='additional_info'>
										Additional Info (Optional)
									</label>
									<input
										id='additional_info'
										name='additional_info'
										type='text'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.additional_info}
										className='mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/> */}
									<div className='relative shadow-md w-full '>
										<textarea
											id='additional_info'
											name='additional_info'
											rows={"3"}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.additional_info}
											placeholder=''
											className={`block px-2.5 pb-2.5 pt-4 w-full text-sm  outline-none text-black border bg-transparent shadow-md rounded-none border-1 border-gray-500 appearance-none  peer`}

										/>

										<label
											htmlFor="additional_info"
											className={`absolute text-sm "text-gray-800 duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:bg-white peer-focus:text-black peer-focus:font-semibold font-normal  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>
											Additional Info (Optional)
										</label>
									</div>
								</div>

								{/* Additional Fiels */}


								{/* Submit Button */}
								<div>
									<button
										type='submit'
										className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none  focus:ring-indigo-500 focus:ring-offset-2'>
										Proceed
									</button>
								</div>
							</form>
						</div>
					</div>
					</div>
				</>
			)}
		</Layout>
	);
};

export default ContextForm;
