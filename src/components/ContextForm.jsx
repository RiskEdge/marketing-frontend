import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AgentResponse from '../components/AgentResponse';
import axios from 'axios';
import Loading from './Loading';
import Layout from './Layout';
import CustomInput from "../components/CustomInput"
import { useLocation } from 'react-router-dom';
import { TbSelector } from "react-icons/tb";
import SelectCustom from './SelectCustom';

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
	const [tags,setTags] = useState([]);

		const [isModalOpen, setIsModalOpen] = useState(false);
		const [selectedOption, setSelectedOption] = useState(''); // For storing selected option
	  
		const handleOpenModal = () => {
		  setIsModalOpen(true); // Open the modal on button click
		};
	  
		const handleCloseModal = () => {
		  setIsModalOpen(false); // Close the modal
		};
	  
		const handleSelectOption = (option) => {
		  setSelectedOption(option); // Update the selected option
		  setIsModalOpen(false); // Close the modal after selection
		};



	const submitFormData = async (formData) => {
		try {
			const agentInfo = JSON.parse(localStorage.getItem('agents'));

			if (agentInfo) {
				console.log('Agent info:', agentInfo);
			}

			const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}form-input`, formData, {
				headers: {
					'Content-Type': 'application/json',
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
			tags:[],
			aiModel:"",
		},
		validationSchema,
		onSubmit: async (values) => {
			try {
				setIsLoading(true);
				formik.values.tags = tags
				formik.values.aiModel = selectedOption
				submitFormData(values);
				console.log(formik.values);
				
				formik.resetForm();
			} catch (error) {
				alert('Failed to submit the form!');
			}
		},
	});

	const {pathname} = useLocation();

	const curPath = pathname.split("/")[2];
	
	
	console.log(formik.values);
	
	

	useEffect(() => {
		localStorage.setItem("formikData", JSON.stringify(formik.values));
	  }, [formik.values]);



	if (haveResponse) {
		return output && <AgentResponse response={output} service={service}  />;
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
												isError={
													formik.touched.company_name &&
													formik.errors.company_name
												}
												htmlFor={'company_name'}
												label={'Company Name'}
											/>
											{formik.touched.company_name &&
											formik.errors.company_name ? (
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
												label={'Industry'}
												htmlFor={'industry'}
												isError={
													formik.touched.industry &&
													formik.errors.industry
												}
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
											label={'Company Website'}
											htmlFor={'company_website'}
											isError={
												formik.touched.company_website &&
												formik.errors.company_website
											}
										/>
										{formik.touched.company_website &&
										formik.errors.company_website ? (
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

								{curPath==="content-creation" &&  <div className='flex flex-col gap-3'>
									
									<SelectCustom 
										name={"tags"}
										tags={tags}
										setTags={setTags}
										options={[
											{label:"Funny",value:"Funny"},
											{label:"Relatable",value:"Relatable"},
											{label:"Descriptive",value:"Descriptive"},
											{label:"Engaging",value:"Engaging"},
											{label:"Controversial",value:"Controversial"},
											{label:"Poetic",value:"Poetic"},
											{label:"Relevant",value:"Relevant"},
											]}
										multi={true}
										defaultValue={{label:"Funny",value:"Funny"}}
									/>
								</div>}

							
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
								<div className='flex gap-3 '>
									<button
										type='submit'
										className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none  focus:ring-indigo-500 focus:ring-offset-2'>
										Proceed
									</button>

									<div className="relative w-full">
											{/* Button */}
											<button
												type="button"
												className="w-full flex gap-2 justify-center items-center text-gray-800 py-2 px-4 rounded-md border border-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
												onClick={handleOpenModal} // Open the modal on click
											>
												{selectedOption || 'ChatGPT'} <TbSelector className="text-xl" />
											</button>

											{/* Modal Popup */}
											{isModalOpen && (
												<div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
												<div className="bg-white p-6 rounded-lg shadow-md max-w-xs w-full">
													<h3 className="text-xl font-semibold mb-4">Select a Model</h3>
													<button
													onClick={() => handleSelectOption('Gemini')}
													className="block w-full text-left px-4 py-2 mb-2 bg-gray-100 hover:bg-gray-200 rounded-md"
													>
													Gemini
													</button>
													<button
													onClick={() => handleSelectOption('ChatGPT')}
													className="block w-full text-left px-4 py-2 mb-2 bg-gray-100 hover:bg-gray-200 rounded-md"
													>
													ChatGPT
													</button>
													<button
													onClick={handleCloseModal}
													className="mt-4 w-full text-center py-2 bg-gray-300 rounded-md"
													>
													Close
													</button>
												</div>
												</div>
											)}
										</div>
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
