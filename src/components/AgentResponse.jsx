import React, { useRef } from 'react';
import MarkdownDisplay from './MarkdownDisplay';
import { IoMdCopy } from 'react-icons/io';
import copy from 'copy-to-clipboard';
import Layout from './Layout';

const AgentResponse = ({ response, service }) => {
	const textRef = useRef();
	// const output = response.result.tasks_output[0];
	const output = response?.result?.tasks_output ? response?.result?.tasks_output[0] : {};
	const token_usage = response?.result?.token_usage ;
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
			<div className='lg:w-4/5 md:w-4/5 w-5/6 mx-auto my-8'>
				<h2 className='font-semibold text-3xl text-pink-500'>{service}</h2>
				<div className='border border-gray-300 p-4 my-3'>
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
				<h2 className='font-semibold text-xl text-pink-500'>Token Usage</h2>
				<div
					key={output.agent + 'agent'}
					className='flex lg:flex-row md:flex-row flex-col py-4 my-3'>
					<div className='border border-gray-300 m-3 p-3'>
						<h3 className='font-bold text-lg'>Input Tokens</h3>
						<p className='text-xl'>{token_usage?.prompt_tokens}</p>
					</div>
					<div className='border border-gray-300 m-3 p-3'>
						<h3 className='font-bold text-lg'>Output Tokens</h3>
						<p className='text-xl'>{token_usage?.completion_tokens}</p>
					</div>
					<div className='border border-gray-300 m-3 p-3'>
						<h3 className='font-bold text-lg'>Total Tokens</h3>
						<p className='text-xl'>{token_usage?.total_tokens}</p>
					</div>
				</div>
			</div>
		</Layout>
	);
};
export default AgentResponse;
