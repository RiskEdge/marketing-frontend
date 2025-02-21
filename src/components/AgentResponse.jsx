import React, { useRef } from 'react';
import MarkdownDisplay from './MarkdownDisplay';
import { IoMdCopy } from 'react-icons/io';
import copy from 'copy-to-clipboard';
import Layout from './Layout';

const AgentResponse = ({ response, service }) => {
	const textRef = useRef();
	// const output = response.result.tasks_output[0];
	const output = response?.result?.tasks_output ? response?.result?.tasks_output[0] : {};
	const token_usage = response?.result?.token_usage;
	const copyToClipboard = () => {
		const copyText = textRef.current.value;
		const isCopied = copy(copyText);
		if (isCopied) {
			console.log('copied');
		}
	};

	return (
		<Layout title={"Agent's Response"}>
			{console.log(response)}
			<div className='flex flex-col pb-24 pt-12 bg-gray-100 items-center w-full justify-center'>
				<h2 className='font-bold text-pink-500 text-center my-6 mt-12 lg:text-6xl mb-12  md:text-5xl text-3xl'>
					{service}
				</h2>
				<div
					className='max-w-3xl border lg:4/5 md:4/5 px-10 py-6 bg-white shadow-xl'
					key={output.agent + 'output'}>
					<div className='w-full mx-auto flex  justify-center items-start'>
						<div className='text-3xl'>
							<button onClick={copyToClipboard}>
								<IoMdCopy />
							</button>
						</div>
						<input
							type='textarea'
							name='output'
							ref={textRef}
							value={output?.raw}
							className='hidden'
							id='output'
							readOnly
						/>
						<MarkdownDisplay markdownText={output?.raw} />
					</div>
					<div key={output.agent + 'agent'} className='flex  flex-col p-4 my-3 '>
						<h2 className='font-semibold text-center text-2xl mb-4 text-pink-500'>
							Token Usage
						</h2>

						<div className='flex justify-center flex-wrap gap-4 bg-white shadow-md'>
							<div className='border-r border-r-gray-400 p-3 '>
								<h3 className='font-bold text-sm md:text-lg'>Input Tokens</h3>
								<p className='text-xs md:text-xl'>{token_usage.prompt_tokens}</p>
							</div>
							<div className='border-r border-r-gray-400 p-3'>
								<h3 className='font-bold text-sm md:text-lg'>Output Tokens</h3>
								<p className='text-xs md:text-xl'>
									{token_usage.completion_tokens}
								</p>
							</div>
							<div className=' p-3'>
								<h3 className='font-bold text-sm md:text-lg'>Total Tokens</h3>
								<p className='text-xs md:text-xl'>{token_usage.total_tokens}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};
export default AgentResponse;
