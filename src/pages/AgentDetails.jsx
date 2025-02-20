// AgentDetails.js
import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import axios from 'axios';
import AgentDetail from '../components/AgentDetail';
import TaskDetail from '../components/TaskDetail';
import ContextForm from '../components/ContextForm';
import Layout from '../components/Layout';
import { GrUserManager } from 'react-icons/gr';
import { BiTask } from 'react-icons/bi';

const AgentDetails = () => {
	const [response, setResponse] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const [agents, setAgents] = useState([]);
	const [tasks, setTasks] = useState([]);

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
			const res = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}agents-info`,
				formData,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			if (localStorage.getItem('agents') && localStorage.getItem('tasks')) {
				const storedAgentAndTaskData = {
					agents: JSON.parse(localStorage.getItem('agents')) || {},
					tasks: JSON.parse(localStorage.getItem('tasks')) || {},
				};
				setIsLoading(false);
				// setResponse(storedAgentAndTaskData);
				setAgents(storedAgentAndTaskData.agents);
				setTasks(storedAgentAndTaskData.tasks);
			} else {
				setResponse(res.data);
				setAgents(res.data?.agents);
				setTasks(res.data?.tasks);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getAgentsInfo();
	}, [formData]);

	const saveAgent = (key, updatedAgent) => {
		const updatedAgents = { ...agents };
		updatedAgents[key] = { ...updatedAgents[key], ...updatedAgent };
		setAgents(updatedAgents);
		localStorage.setItem('agents', JSON.stringify(updatedAgents));
	};

	const saveTask = (key, updatedTask) => {
		const updatedTasks = { ...tasks };
		updatedTasks[key] = { ...updatedTasks[key], ...updatedTask };
		setTasks(updatedTasks);
		localStorage.setItem('tasks', JSON.stringify(updatedTasks));
	};

	const resetAgent = (key) => {
		setAgents((prev) => {
			const updatedAgents = { ...prev };
			updatedAgents[key] = response.agents[key];
			return updatedAgents;
		});
	};

	const resetTask = (key) => {
		setTasks((prev) => {
			const updatedTasks = { ...prev };
			updatedTasks[key] = response.tasks[key];
			return updatedTasks;
		});
	};

	if (!formData) {
		return <ContextForm />;
	}

	return (
		<Layout>
			<div className='w-full h-full bg-gray-100'>
				<div className='lg:mx-auto  lg:w-4/5 py-12 px-4 '>
					<h1 className='text-4xl md:text-5xl justify-center mb-12 text-blue-600 font-bold flex items-center gap-2'>
						Agents <GrUserManager />
					</h1>
					{isLoading ? (
						<Loading />
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
							{agents &&
								Object.keys(agents).map((key) => (
									<AgentDetail
										key={key}
										agent={agents[key]}
										agentKey={key}
										onSave={saveAgent}
										onReset={resetAgent}
									/>
								))}
						</div>
					)}
					<h1 className='text-5xl my-12 flex items-center justify-center text-blue-600 font-bold'>
						Tasks <BiTask />
					</h1>
					{isLoading ? (
						<Loading />
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-min'>
							{tasks &&
								Object.keys(tasks).map((key) => (
									<TaskDetail
										key={key}
										task={tasks[key]}
										taskKey={key}
										onSave={saveTask}
										onReset={resetTask}
									/>
								))}
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};
export default AgentDetails;
