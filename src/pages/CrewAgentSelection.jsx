import React from 'react';

const CrewAgentSelection = () => {
	return (
		<div className='min-h-screen flex flex-col md:flex-row lg:flex-row justify-center items-center space-x-8'>
			<a
				href='/crew/marketing-analysis'
				className='border broder-gray-400 p-8 rounded-md font-bold text-3xl text-blue-500 hover:bg-pink-100 hover:text-pink-500'>
				<div>Marketing Analysis</div>
			</a>
			<a
				href='/crew/seo-analysis'
				className='border broder-gray-400 p-8 rounded-md font-bold text-3xl text-blue-500 hover:bg-pink-100 hover:text-pink-500'>
				<div>SEO Analysis</div>
			</a>
			<a
				href='/crew/content-creation'
				className='border broder-gray-400 p-8 rounded-md font-bold text-3xl text-blue-500 hover:bg-pink-100 hover:text-pink-500'>
				<div>Content Creation</div>
			</a>
		</div>
	);
};
export default CrewAgentSelection;
