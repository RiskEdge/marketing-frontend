import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import axios from 'axios';
import Markdown from 'react-markdown';
import MarkdownDisplay from '../components/MarkdownDisplay';
import ContextForm from '../components/ContextForm';

const AgentDetails = () => {
	const [response, setResponse] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const [formData, setFormData] = useState({
		company_name: '',
		company_website: '',
		industry: '',
		agent: '',
		services: '',
		competitors_context: '',
		content_type: '',
		additional_info: '',
	});

	useEffect(() => {
		const storedData = {
			company_name: localStorage.getItem('company_name') || '',
			company_website: localStorage.getItem('company_website') || '',
			industry: localStorage.getItem('industry') || '',
			agent: localStorage.getItem('agent') || '',
			services: localStorage.getItem('services') || '',
			competitors_context: localStorage.getItem('competitors_context') || '',
			content_type: localStorage.getItem('content_type') || '',
			additional_info: localStorage.getItem('additional_info') || '',
		};

		setFormData(storedData); // Update the state with the data from localStorage
	}, []);

	useEffect(() => {
		const getAgentsInfo = async () => {
			try {
				const res = await axios.post('http://localhost:8000/agents-info', formData, {
					headers: {
						'Content-Type': 'application/json',
					},
				});
				setResponse(res.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		if (formData) {
			getAgentsInfo();
		}
	}, [isLoading]);

	// const agents = agentData.agents;
	// const tasks = agentData.tasks;
	const agents = response.agents;
	const tasks = response.tasks;

	if (!formData) {
		return <ContextForm />;
	}
	return (
		<div className='mx-auto my-10 lg:w-4/5'>
			<h1 className='text-3xl text-blue-600 font-bold'>Agents</h1>
			{isLoading ? (
				<Loading />
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
					{Object.keys(agents).map((key) => (
						<div key={key} className='border border-gray-300 px-4 py-3 m-3'>
							<h2 className='font-bold text-xl text-pink-500 mb-2'>
								{agents[key].role}
							</h2>
							<div className='mb-3'>
								<h3 className='font-semibold'>Goal</h3>
								{/* <p>{agents[key].goal}</p> */}
								<MarkdownDisplay markdownText={agents[key].goal} />
							</div>
							<div className='mb-2'>
								<h3 className='font-semibold'>Backstory</h3>
								{/* <p>{agents[key].backstory}</p> */}
								<MarkdownDisplay markdownText={agents[key].backstory} />
							</div>
						</div>
					))}
				</div>
			)}
			<h1 className='text-3xl text-blue-600 font-bold'>Tasks</h1>
			{isLoading ? (
				<Loading />
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
					{Object.keys(tasks).map((key) => (
						<div key={key} className='border border-gray-300 py-3 px-4 m-3'>
							<h2 className='font-bold text-xl text-pink-500 mb-2'>
								{tasks[key].agentName}
							</h2>
							<div className='mb-2'>
								<h3 className='font-semibold'>Task Description</h3>
								{/* <p>{tasks[key].description}</p> */}
								<MarkdownDisplay markdownText={tasks[key].description} />
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
export default AgentDetails;
