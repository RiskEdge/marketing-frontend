import React, { useEffect, useState } from 'react';
import axios from 'axios';

import MarkdownDisplay from '../components/MarkdownDisplay';

import marketingResponse from '../assets/marketing_analysis/response5.json';
import seoResponse from '../assets/seo/response4.json';
import contentResponse from '../assets/content/response2.json';

const CrewOutput = () => {
	// const [crewOutput, setCrewOutput] = useState([]);
	// const task_outputs = result.result.tasks_output;
	// const token_usage = result.result.token_usage;

	const marketingOutput = {
		output: marketingResponse.result.tasks_output[0],
		token_usage: marketingResponse.result.token_usage,
	};

	const seoOutput = {
		output: seoResponse.result.tasks_output[0],
		token_usage: seoResponse.result.token_usage,
	};

	const contentOutput = {
		output: contentResponse.result.tasks_output[0],
		token_usage: contentResponse.result.token_usage,
	};

	const crewOutputs = [marketingOutput, seoOutput, contentOutput];

	/* useEffect(() => {
		const getCrewOutput = async () => {
			const res = await axios.post('http://localhost:8000/form-input', {
				topic: 'https://officespaceciril.in/',
			});
			console.log(res);
		};

		getCrewOutput();
	}, []); */

	return (
		<div className='m-4 p-3'>
			<h2 className='font-bold text-blue-500 text-3xl'>Crew Output</h2>
			<div>
				{crewOutputs.map((output) => (
					<div key={output.output.agent + 'output'}>
						<div
							key={output.output.agent}
							className='border border-gray-300 p-4 my-3 lg:w-2/3'>
							<h2 className='font-semibold text-xl text-pink-500'>
								{output.output.agent}
							</h2>
							<div>
								<MarkdownDisplay markdownText={output.output.raw} />
							</div>
						</div>
						<h2 className='font-semibold text-xl text-pink-500'>Token Usage</h2>
						<div
							key={output.output.agent + 'agent'}
							className='flex lg:flex-row md:flex-row flex-col py-4 my-3 '>
							<div className='border border-gray-300 mx-3 p-3'>
								<h3 className='font-bold text-lg'>Input Tokens</h3>
								<p className='text-xl'>{output.token_usage.prompt_tokens}</p>
							</div>
							<div className='border border-gray-300 mx-3 p-3'>
								<h3 className='font-bold text-lg'>Output Tokens</h3>
								<p className='text-xl'>{output.token_usage.completion_tokens}</p>
							</div>
							<div className='border border-gray-300 mx-3 p-3'>
								<h3 className='font-bold text-lg'>Total Tokens</h3>
								<p className='text-xl'>{output.token_usage.total_tokens}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default CrewOutput;
