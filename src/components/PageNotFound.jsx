import React from 'react';

import Lottie from 'react-lottie';
import notfound from '../assets/gifs/security-research.json';

const PageNotFound = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: notfound,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<div className='min-h-screen flex flex-col justify-center items-center'>
			<div className='border broder-gray-400 p-8 rounded-md'>
				<p className='font-bold text-4xl text-blue-500'>Oops! The page doesn't exist</p>
				<Lottie options={defaultOptions} height={400} width={400} />
			</div>
		</div>
	);
};
export default PageNotFound;
