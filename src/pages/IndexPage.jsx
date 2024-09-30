import React from 'react';

const IndexPage = () => {
	return (
		<div className='min-h-screen flex flex-col md:flex-row lg:flex-row justify-center items-center space-x-8'>
			<a
				href='/agent-details'
				className='border broder-gray-400 p-8 rounded-md font-bold text-3xl text-blue-500 hover:bg-pink-100 hover:text-pink-500'>
				<div>Agent Info</div>
			</a>
			<a
				href='/crew'
				className='border broder-gray-400 p-8 rounded-md font-bold text-3xl text-blue-500 hover:bg-pink-100 hover:text-pink-500'>
				<div>Marketing</div>
			</a>
		</div>
	);
};
export default IndexPage;
