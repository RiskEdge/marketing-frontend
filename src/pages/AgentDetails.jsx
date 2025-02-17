import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import axios from 'axios';
import Markdown from 'react-markdown';
import MarkdownDisplay from '../components/MarkdownDisplay';
import ContextForm from '../components/ContextForm';
import Layout from '../components/Layout';

const AgentDetails = () => {
	const [response, setResponse] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const [agents, setAgents] = useState({});
	const [tasks, setTasks] = useState({});

	const [editMode, setEditMode] = useState(false);

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

	const getAgentsInfo = async () => {
		try {
			if (localStorage.getItem('agents') && localStorage.getItem('tasks')) {
				const storedAgentAndTaskData = {
					agents: JSON.parse(localStorage.getItem('agents')) || {},
					tasks: JSON.parse(localStorage.getItem('tasks')) || {},
				};
				setIsLoading(false);
				console.log('From Local Storage');
				setResponse(storedAgentAndTaskData);
			} else {
				const res = await axios.post(
					'https://marketing-server.riskedgesolutions.com/agents-info',
					formData,
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);
				setResponse(res.data);
				console.log('From Backend');
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (formData) {
			getAgentsInfo();
			setAgents(response.agents);
			setTasks(response.tasks);
		}
	}, [isLoading]);

	const handleEdit = (type, key, value) => {
		if (type === 'agent') {
			const updatedAgents = { ...agents };
			updatedAgents[key] = { ...updatedAgents[key], ...value };
			setAgents(updatedAgents);
			localStorage.setItem('agents', JSON.stringify(updatedAgents));
		} else if (type === 'task') {
			const updatedTasks = { ...tasks };
			updatedTasks[key] = { ...updatedTasks[key], ...value };
			setTasks(updatedTasks);
			localStorage.setItem('tasks', JSON.stringify(updatedTasks));
		}
	};

	const toggleEditMode = () => {
		setEditMode(!editMode);
	};

	const saveChanges = async () => {
		try {
			const response = await axios.put('http://localhost:8000/edit-agent-info', {
				agent: agents || null,
				task: tasks || null,
			});
			console.log('Updated successfully:', response.data);
			toggleEditMode();
		} catch (error) {
			console.error('Error updating:', error);
		}
	};

	const resetChanges = () => {
		localStorage.removeItem('agents');
		localStorage.removeItem('tasks');
		getAgentsInfo();
		setAgents(response.agents);
		setTasks(response.tasks);
		setEditMode(false);
	};

	if (!formData) {
		return <ContextForm />;
	}
	return (
		<Layout>
			<div className='mx-auto my-10 lg:w-4/5'>
				<h1 className='text-3xl text-blue-600 font-bold'>Agents</h1>
				<div className='flex flex-col float-right'>
					<button
						onClick={toggleEditMode}
						className=' px-4 py-2 mx-auto my-3 border rounded-md border-gray-300 font-bold hover:text-pink-500 hover:border-pink-500 hover:bg-pink-100'>
						Edit Mode
					</button>
					<button
						onClick={saveChanges}
						className='w-full px-4 py-2 mx-auto my-3 border rounded-md border-gray-300 font-bold hover:text-pink-500 hover:border-pink-500 hover:bg-pink-100'>
						Save
					</button>
					<button
						onClick={resetChanges}
						className='w-full px-4 py-2 mx-auto my-3 border rounded-md border-gray-300 font-bold hover:text-pink-500 hover:border-pink-500 hover:bg-pink-100'>
						Reset
					</button>
				</div>
				{isLoading ? (
					<Loading />
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 '>
						{agents &&
							Object.keys(agents).map((key) => (
								<div key={key} className='border border-gray-300 px-4 py-3 m-3'>
									<h2 className='font-bold text-xl text-pink-500 mb-2'>
										{agents[key].role}
									</h2>
									{editMode ? (
										<>
											<div className='mb-3'>
												<h3 className='font-semibold'>Goal</h3>
												<textarea
													name={agents[key].role}
													rows='5'
													className='w-full h-fit resize text-wrap p-3'
													value={agents[key].goal}
													onChange={(e) => {
														handleEdit('agent', key, {
															goal: e.target.value,
														});
													}}
												/>
											</div>
											<div className='mb-2'>
												<h3 className='font-semibold'>Backstory</h3>
												<textarea
													// type='textarea'
													name={agents[key].role}
													rows='10'
													className='w-full resize text-wrap p-3'
													value={agents[key].backstory}
													onChange={(e) => {
														handleEdit('agent', key, {
															backstory: e.target.value,
														});
													}}
												/>
											</div>
										</>
									) : (
										<>
											<div className='mb-3'>
												<h3 className='font-semibold'>Goal</h3>
												<MarkdownDisplay markdownText={agents[key].goal} />
											</div>
											<div className='mb-2'>
												<h3 className='font-semibold'>Backstory</h3>
												<MarkdownDisplay
													markdownText={agents[key].backstory}
												/>
											</div>
										</>
									)}
								</div>
							))}
					</div>
				)}
				<h1 className='text-3xl text-blue-600 font-bold'>Tasks</h1>
				{isLoading ? (
					<Loading />
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
						{tasks &&
							Object.keys(tasks).map((key) => (
								<div key={key} className='border border-gray-300 py-3 px-4 m-3'>
									<h2 className='font-bold text-xl text-pink-500 mb-2'>
										{tasks[key].agentName}
									</h2>
									{editMode ? (
										<>
											<div className='mb-2'>
												<h3 className='font-semibold'>Task Description</h3>
												<textarea
													name={tasks[key].agentName}
													rows='10'
													className='w-full resize text-wrap p-3'
													value={tasks[key].description}
													onChange={(e) => {
														handleEdit('task', key, {
															description: e.target.value,
														});
													}}
												/>
											</div>
										</>
									) : (
										<>
											<div className='mb-2'>
												<h3 className='font-semibold'>Task Description</h3>
												<MarkdownDisplay
													markdownText={tasks[key].description}
												/>
											</div>
										</>
									)}
								</div>
							))}
					</div>
				)}
			</div>
		</Layout>
	);
};
export default AgentDetails;
