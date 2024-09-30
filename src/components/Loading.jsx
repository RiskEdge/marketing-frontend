import React from 'react';
import { Slab } from 'react-loading-indicators';

const Loading = () => {
	return (
		<div className='flex flex-row min-h-screen justify-center items-center'>
			<Slab color='#67cbff' size='large' text='LOADING' textColor='' />
		</div>
	);
};
export default Loading;
