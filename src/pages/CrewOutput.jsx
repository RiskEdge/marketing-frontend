import React, { useEffect, useState } from 'react';
import axios from 'axios';

import MarkdownDisplay from '../components/MarkdownDisplay';

import marketingResponse from '../assets/marketing_analysis/response5.json';
import seoResponse from '../assets/seo/response4.json';
import contentResponse from '../assets/content/response2.json';
import Layout from '../components/Layout';

const CrewOutput = () => {
	// const [crewOutput, setCrewOutput] = useState([]);
	// const task_outputs = result.result.tasks_output;
	// const token_usage = result.result.token_usage;

	const marketingOutput = {
		output: marketingResponse.result.tasks_output[0],
		token_usage: marketingResponse.result.token_usage,
	};

	// const seoOutput = {
	// 	output: seoResponse.result.tasks_output[0],
	// 	token_usage: seoResponse.result.token_usage,
	// };

	// const contentOutput = {
	// 	output: contentResponse.result.tasks_output[0],
	// 	token_usage: contentResponse.result.token_usage,
	// };

	const crewOutputs = [ marketingOutput];

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
		<Layout >

			<div className='flex flex-col pb-24 pt-12 bg-gray-100 items-center w-full justify-center'>
			<h2 className='font-bold text-center my-6 mt-12 lg:text-6xl mb-12  md:text-5xl text-3xl'>Crew Output</h2>

				<div className='w-full mx-auto flex  justify-center items-start'>
					<div className='md:p-8 p-4 xl:p-0 max-w-7xl mx-auto flex gap-16 flex-wrap justify-start items-start'>
					{crewOutputs.map((output) => (

						<div className='max-w-2xl border bg-white  shadow-xl' key={output.output.agent + 'output'}>
							<div
								key={output.output.agent + 'agent'}
								className='flex  flex-col p-4 my-3 '>
								<h2 className='font-semibold text-center text-2xl mb-4 text-pink-500'>Token Usage</h2>

								<div className='flex justify-center flex-wrap gap-4 bg-white shadow-md'>
									<div className='border-r border-r-gray-400 p-3 '>
										<h3 className='font-bold text-sm md:text-lg'>Input Tokens</h3>
										<p className='text-xs md:text-xl'>{output.token_usage.prompt_tokens}</p>
									</div>
									<div className='border-r border-r-gray-400 p-3'>
										<h3 className='font-bold text-sm md:text-lg'>Output Tokens</h3>
										<p className='text-xs md:text-xl'>
											{output.token_usage.completion_tokens}
										</p>
									</div>
									<div className=' p-3'>
										<h3 className='font-bold text-sm md:text-lg'>Total Tokens</h3>
										<p className='text-xs md:text-xl'>{output.token_usage.total_tokens}</p>
									</div>
								</div>
							</div>
							<div
								key={output.output.agent}
								className=' max-w-2xl md:p-8 p-3 my-3'>
								<h2 className='font-semibold text-xl md:text-3xl text-pink-500 mb-4'>
									{output.output.agent}
								</h2>
									<div className='max-h-[300px] overflow-y-scroll'>
									<MarkdownDisplay markdownText={output.output.raw} />
									</div>
							</div>
							
						</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};
export default CrewOutput;
