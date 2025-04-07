import React, { useRef, useState } from 'react';
import MarkdownDisplay from './MarkdownDisplay';
import { IoMdCopy } from 'react-icons/io';
import copy from 'copy-to-clipboard';
import Layout from './Layout';
import marketingResponse from '../assets/marketing_analysis/response5.json';
import { BsClipboardCheck } from 'react-icons/bs';
import ContextForm from './ContextForm';

const AgentResponse = ({ response, outputHeading, service, formdata }) => {
	const textRef = useRef();

	const [copyText, setCopyText] = useState(false);

	const marketingOutput = {
		output: marketingResponse.result.tasks_output[0],
		token_usage: marketingResponse.result.token_usage,
	};
	// const output = response.result.tasks_output[0];
	const output = response ? response?.result?.tasks_output[0] : marketingOutput.output;
	const token_usage = response ? response?.result?.token_usage : marketingOutput.token_usage;
	const copyToClipboard = () => {
		const copyText = textRef.current.value;
		const isCopied = copy(copyText);

		if (isCopied) {
			setCopyText(true);
			console.log('copied');
		}
		setTimeout(() => {
			setCopyText(false);
		}, 3000);
	};

	return (
		<Layout title={"Agent's Response"}>
			<div className='flex flex-col pb-24 pt-12 bg-gray-100 items-center w-full justify-center'>
				<h2 className='font-bold text-pink-500 text-center my-6 mt-12 lg:text-6xl mb-16  md:text-5xl text-3xl'>
					{service}
				</h2>
				<div className='flex flex-col-reverse  lg:flex-row-reverse items-center justify-between w-full max-w-7xl px-3 gap-10 mx-auto'>
					<div
						className='max-w-2xl  h-screen overflow-y-scroll  thin-scrollbar shadow-xl w-full border lg:4/5 md:4/5 px-10 py-6 bg-white '
						key={output.agent + 'output'}>
						<h2 className='font-bold text-pink-500 text-center my-6 lg:text-3xl  md:text-5xl text-3xl'>
							{outputHeading}
						</h2>

						<div className='w-full mx-auto flex flex-col relative justify-center items-start'>
							<div
								className='text-xl relative w-full flex justify-center	
							 items-center bg-pink-200 rounded-md py-1 hover:bg-pink-500 hover:text-white'>
								<button onClick={copyToClipboard}>
									{copyText ? (
										<BsClipboardCheck />
									) : (
										<p className='flex flex-row items-center '>
											<IoMdCopy className='text-3xl flex flex-row gap-2 items-center' />{' '}
											<span className='text-sm'>Copy to Clipboard</span>
										</p>
									)}
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
					</div>

					<div className='flex items-center shadow-xl justify-start h-screen overflow-y-scroll hide-scrollbar bg-white p-6  flex-col gap-8 w-full max-w-2xl'>
						<div
							key={output.agent + 'agent'}
							className='flex w-full flex-col p-4 my-3 '>
							<h2 className='font-semibold text-center mt- text-2xl mb-4 text-pink-500'>
								Token Usage
							</h2>

							<div className='flex justify-center flex-wrap gap-4 bg-white shadow-md'>
								<div className='border-r border-r-gray-400 p-3 '>
									<h3 className='font-bold text-sm md:text-lg'>Input Tokens</h3>
									<p className='text-xs md:text-xl'>
										{token_usage.prompt_tokens}
									</p>
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

						<div className=' p-4 flex-col flex justify-center items-center'>
							<h2 className='font-semibold text-center text-2xl mb-4 text-pink-500'>
								Your Prompt
							</h2>

							<div className='w-full flex flex-col gap-6 p-3'>
								{/* <ContextForm /> */}
								{formdata &&
									Object.keys(formdata).map((key) => {
										return (
											<div className='flex flex-col gap-2 ' key={key}>
												<h4 className='text-sm font-semibold uppercase text-gray-800'>
													{key}:
												</h4>
												<p className='border-b text-xs md:text-base border-blue-400/80 rounded-lg p-2 w-full bg-gray-100'>
													{formdata[key]}
												</p>
											</div>
										);
									})}
							</div>
						</div>
					</div>

					{/* <div className=' p-4 flex-col flex justify-center items-center'>
						<h2 className='font-semibold text-center text-2xl mb-4 text-pink-500'>
							Your Prompt
						</h2>

						<div className='w-full flex flex-col gap-6 p-3'>
							{formdata &&
								Object.keys(formdata).map((key) => {
									return (
										<div className='flex flex-col gap-2 ' key={key}>
											<h4 className='text-sm font-semibold uppercase text-gray-800'>
												{key}:
											</h4>
											<p className='border-b text-xs md:text-base border-blue-400/80 rounded-lg p-2 w-full bg-gray-100'>
												{formdata[key]}
											</p>
										</div>
									);
								})}
						</div>
					</div> */}
				</div>
			</div>
			{/* </div> */}
		</Layout>
	);
};
export default AgentResponse;
