import React from 'react';
import { Slab } from 'react-loading-indicators';
import loadingGif from "../assets/gifs/loading.gif"
const Loading = () => {
	return (
		<div className='flex flex-col min-h-screen justify-center items-center'>
			<img src={loadingGif}  className='w-56 h-56' alt='Loading Gif' />
			<p className=''>Loading...</p>
		</div>
	);
};
export default Loading;
