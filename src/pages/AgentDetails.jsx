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
import { BsConeStriped } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';

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
		topic: '',
		creativity: '',
		tags: '',
		llm: '',
	});

	useEffect(() => {
		const storedData = {
			company_name: localStorage.getItem('company_name') || 'COMPANY NAME',
			company_website: localStorage.getItem('company_website') || 'COMPANY WEBSITE',
			industry: localStorage.getItem('industry') || 'INDUSTRY',
			// agent: localStorage.getItem('agent') || '',
			topic: localStorage.getItem('topic') || 'TOPIC',
			creativity: localStorage.getItem('creativity') || 0.5,
			services: localStorage.getItem('services') || 'SERVICES',
			competitors_context:
				localStorage.getItem('competitors_context') || 'COMPETITORS CONTEXT',
			content_type: localStorage.getItem('content_type') || 'CONTENT TYPE',
			additional_info: localStorage.getItem('additional_info') || 'ADDITIONAL INFO',
			tags: JSON.parse(localStorage.getItem('tags') || '[]'), // ✅ Ensure array
			llm: localStorage.getItem('llm') || 'ChatGPT',
		};
		setFormData(storedData); // Update the state with the data from localStorage
	}, []);

	const getAgentsInfo = async () => {
		try {
			// if (localStorage.getItem('agents') && localStorage.getItem('tasks')) {
			// 	const storedAgentAndTaskData = {
			// 		agents: JSON.parse(localStorage.getItem('agents')),
			// 		tasks: JSON.parse(localStorage.getItem('tasks')),
			// 	};
			// 	setResponse(storedAgentAndTaskData);
			// 	setAgents(storedAgentAndTaskData.agents);
			// 	setTasks(storedAgentAndTaskData.tasks);
			// 	setIsLoading(false);
			// 	// res?.data ? setIsLoading(false) : null;
			// } else {
			const res = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}agents-info`
				// formData,
				// {
				// 	headers: {
				// 		'Content-Type': 'multipart/form-data',
				// 	},
				// }
			);
			// console.log(res.data);
			setResponse(res.data);
			setAgents(res.data?.agents);
			setTasks(res.data?.tasks);
			// res?.data ? setIsLoading(false) : null;
			localStorage.setItem('agents', JSON.stringify(res.data?.agents));
			localStorage.setItem('tasks', JSON.stringify(res.data?.tasks));
			// }
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getAgentsInfo();
	}, [formData]);

	const getToast = (status, message) => {
		if (status == 200) {
			return toast.success(message, {
				position: 'bottom-center',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		} else {
			return toast.error(message, {
				position: 'bottom-center',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		}
	};

	const saveAgent = async (key, updatedAgent) => {
		console.log('Key: ', key, updatedAgent);
		const updatedAgents = { ...agents };
		updatedAgents[key] = { ...updatedAgents[key], ...updatedAgent };
		setAgents(updatedAgents);
		localStorage.setItem('agents', JSON.stringify(updatedAgents));

		const data = {
			role: key,
			goal: updatedAgent.goal,
			backstory: updatedAgent.backstory,
		};

		const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}edit-agent-info`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log(res);
		getToast(res?.data.status, res?.data.message);
	};

	const saveTask = async (key, updatedTask) => {
		const updatedTasks = { ...tasks };
		updatedTasks[key] = { ...updatedTasks[key], ...updatedTask };
		setTasks(updatedTasks);
		localStorage.setItem('tasks', JSON.stringify(updatedTasks));

		// console.log('All Tasks: ', tasks);
		// console.log('All Updated Tasks: ', updatedTasks);

		// console.log('Updated Task: ', updatedTask);

		const data = {
			task_name: updatedTask[key].task_name,
			description: updatedTask.description,
			agentName: updatedTask.agentName,
		};

		const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}edit-task-info`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log(res);
		getToast(res?.data.status, res?.data.message);
	};

	const resetAgent = async (key) => {
		setAgents((prev) => {
			const updatedAgents = { ...prev };
			updatedAgents[key] = response.agents[key];
			return updatedAgents;
		});

		const res = await axios.put(
			`${import.meta.env.VITE_SERVER_URL}reset-agent-info`,
			{
				role: key,
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);

		getToast(res?.data.status, res?.data.message);
	};

	const resetTask = async (key) => {
		setTasks((prev) => {
			const updatedTasks = { ...prev };
			updatedTasks[key] = response.tasks[key];
			return updatedTasks;
		});
		console.log(tasks[key].task_name);

		const res = await axios.put(
			`${import.meta.env.VITE_SERVER_URL}reset-task-info`,
			{
				task_name: tasks[key].task_name,
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);
		// console.log(res);

		console.log(res);
		if (res?.status == 200) {
			const data = res?.data?.response?.data[0];
			console.log(data);
			const reset_task = {
				task_name: data.task_name,
				agentName: data.agent_name,
				description: data.edited_description,
			};

			const updatedTasks = { ...tasks };
			updatedTasks[key] = { ...updatedTasks[key], ...reset_task };
			setTasks(updatedTasks);
			localStorage.setItem('tasks', JSON.stringify(updatedTasks));
		}
		getToast(res?.data.status, res?.data.message);
	};

	if (!formData) {
		return <ContextForm />;
	}

	return (
		<Layout>
			<div className='w-full min-h-screen bg-gray-100'>
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
									<div key={key}>
										<AgentDetail
											key={key}
											agent={agents[key]}
											agentKey={key}
											onSave={saveAgent}
											onReset={resetAgent}
										/>
										<ToastContainer
											position='bottom-center'
											autoClose={1000}
											hideProgressBar={false}
											newestOnTop={false}
											closeOnClick={false}
											rtl={false}
											pauseOnFocusLoss
											draggable
											pauseOnHover
											theme='light'
										/>
									</div>
								))}
						</div>
					)}
					<h1 className='text-5xl my-12 flex items-center justify-center text-blue-600 font-bold'>
						Tasks <BiTask />
					</h1>
					{isLoading ? (
						<Loading />
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 '>
							{tasks &&
								Object.keys(tasks).map((key) => (
									<div key={key}>
										<TaskDetail
											key={key}
											task={tasks[key]}
											taskKey={key}
											onSave={saveTask}
											onReset={resetTask}
										/>
										<ToastContainer
											position='bottom-center'
											autoClose={1000}
											hideProgressBar={false}
											newestOnTop={false}
											closeOnClick={false}
											rtl={false}
											pauseOnFocusLoss
											draggable
											pauseOnHover
											theme='light'
										/>
									</div>
								))}
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};
export default AgentDetails;
