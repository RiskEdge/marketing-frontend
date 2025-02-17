import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AgentResponse from '../components/AgentResponse';
import axios from 'axios';
import Loading from './Loading';
import Layout from './Layout';

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
	content_type: Yup.string().required('Content type is required'),
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

			const response = await axios.post('http://localhost:8000/form-input', formData, {
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
				console.log(values);
				submitFormData(values);
			} catch (error) {
				alert('Failed to submit the form!');
			}
		},
	});

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
					<div className='max-w-lg mx-auto mt-10'>
						<h2 className='text-2xl font-bold mb-6 text-center'>Client Info</h2>
						<form onSubmit={formik.handleSubmit} className='space-y-4'>
							{/* Company Name */}
							<div>
								<label
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
								/>
								{formik.touched.company_name && formik.errors.company_name ? (
									<div className='text-red-500 text-sm'>
										{formik.errors.company_name}
									</div>
								) : null}
							</div>

							{/* Company Website */}
							<div>
								<label
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
								/>
								{formik.touched.company_website && formik.errors.company_website ? (
									<div className='text-red-500 text-sm'>
										{formik.errors.company_website}
									</div>
								) : null}
							</div>

							{/* Industry */}
							<div>
								<label
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
								/>
								{formik.touched.industry && formik.errors.industry ? (
									<div className='text-red-500 text-sm'>
										{formik.errors.industry}
									</div>
								) : null}
							</div>

							{/* Services */}
							<div>
								<label
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
								/>
							</div>

							{/* Action */}
							<div>
								<label
									className='block text-sm font-medium text-gray-700/40'
									htmlFor='agent'>
									What do you want to do today?
								</label>
								<select
									id='agent'
									name='agent'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.agent}
									className={`mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
										formik.touched.agent && formik.errors.agent
											? 'border-red-500'
											: ''
									}`}>
									<option value={agent}>{service}</option>{' '}
									{/* Default option with empty value */}
									<option value='marketing_analyst'>Marketing Analysis</option>
									<option value='SEO_specialist'>
										Search Engine Optimization
									</option>
									<option value='content_creator'>Content Creation</option>
								</select>
								{formik.touched.agent && formik.errors.agent ? (
									<div className='text-red-500 text-sm'>
										{formik.errors.agent}
									</div>
								) : null}
							</div>

							{/* Competitors Context */}
							<div>
								<label
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
								/>
							</div>

							{/* Content Type */}
							<div>
								<label
									className='block text-sm font-medium text-gray-700/40'
									htmlFor='content_type'>
									Content Type
								</label>
								<select
									id='content_type'
									name='content_type'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.content_type}
									className={`mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
										formik.touched.agent && formik.errors.agent
											? 'border-red-500'
											: ''
									}`}>
									<option value=''>Select content form</option>
									{/* Default option with empty value */}
									<option value='LinkedIn post'>Linked Post</option>
									<option value='Instagram post'>Instagram Post</option>
									<option value='Twitter post'>Twitter Post</option>
								</select>
								{formik.touched.content_type && formik.errors.content_type ? (
									<div className='text-red-500 text-sm'>
										{formik.errors.content_type}
									</div>
								) : null}
							</div>

							{/* Additional Info */}
							<div>
								<label
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
								/>
							</div>

							{/* Submit Button */}
							<div>
								<button
									type='submit'
									className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
									Proceed
								</button>
							</div>
						</form>
					</div>
				</>
			)}
		</Layout>
	);
};

export default ContextForm;
