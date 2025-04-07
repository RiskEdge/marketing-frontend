import React, { useState, useEffect } from 'react';
import { Slab } from 'react-loading-indicators';
import loadingGif from '../assets/gifs/loading.gif';

const Loading = ({ stages }) => {
	// return (
	// 	<div className='flex flex-col min-h-screen justify-center items-center'>
	// 		<img src={loadingGif}  className='w-56 h-56' alt='Loading Gif' />
	// 		<p className=''>Loading...</p>
	// 	</div>
	// );

	const [currentStage, setCurrentStage] = useState(0);

	useEffect(() => {
		if (!stages || stages.length === 0 || currentStage >= stages.length - 1) return;

		const interval = setTimeout(() => {
			setCurrentStage((prevStage) => prevStage + 1);
		}, stages[currentStage]?.duration || 2000); // Use provided duration or default to 2s

		return () => clearTimeout(interval);
	}, [stages, currentStage]);
	// console.log('Current Image Path:', stages[currentStage].image);
	if (!stages || stages.length === 0) return null;

	return (
		<div className='flex flex-col min-h-screen justify-center items-center'>
			<img src={stages[currentStage].image} className='w-80 h-80' alt='Loading' />
			<p className='mt-4 text-xl font-semibold'>{stages[currentStage].stage}</p>
		</div>
	);
};
export default Loading;
