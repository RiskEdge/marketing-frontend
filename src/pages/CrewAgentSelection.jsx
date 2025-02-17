import React from 'react';
import Layout from '../components/Layout';
import marketingAnalysis from "../assets/images/marketing-analysis.webp"
import seoAnalysis from "../assets/images/seo-analysis.webp"
import contentCreation from "../assets/images/content-creation.webp"

const CrewAgentSelection = () => {
	return (
		<Layout>
			<div className='min-h-screen relative bg-marketing bg-gray-200 py-24 flex flex-col items-center justify-center'>
			<div className='absolute w-full h-full bg-black opacity-60 '>
					</div>
				<h2 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white z-10 font-bold mb-16 underline underline-offset-4'>Marketing</h2>

			<div className='flex flex-wrap justify-center items-center gap-8 p-5'>
			<a href='/crew/marketing-analysis' className="max-w-sm  rounded-lg relative bg-white hover:scale-105 transition transform duration-300 shadow-lg border cursor-pointer border-gray-400/50">
					<div className='absolute w-full h-full bg-black rounded-lg opacity-0 hover:opacity-80 transition duration-300 flex items-center justify-center'>
						<h3 className='text-2xl font-bold text-white'>Marketing Analysis</h3>
					</div>
					<img className=" md:h-[220px] rounded-lg" src={marketingAnalysis} alt="" />
				
				</a>


				<a href='/crew/content-creation' className="max-w-sm rounded-lg relative bg-white hover:scale-105 transition transform duration-300 shadow-lg border cursor-pointer border-gray-400/50">
					<div className='absolute w-full h-full bg-black rounded-lg opacity-0 hover:opacity-80 transition duration-300 flex items-center justify-center'>
						<h3 className='text-2xl font-bold text-white'>Content Creation</h3>
					</div>
					<img className=" md:h-[220px] rounded-lg" src={contentCreation} alt="" />
				
				</a>


				<a href='/crew/seo-analysis' className="max-w-sm rounded-lg relative bg-white hover:scale-105 transition transform duration-300 shadow-lg border cursor-pointer border-gray-400/50">
					<div className='absolute w-full h-full bg-black rounded-lg opacity-0 hover:opacity-80 transition duration-300 flex items-center justify-center'>
						<h3 className='text-2xl font-bold text-white'>SEO Analysis</h3>
					</div>
					<img className=" md:h-[220px] rounded-lg" src={seoAnalysis} alt="" />
				
				</a>
			</div>



				{/* <a
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
				</a> */}
			</div>
		</Layout>
	);
};
export default CrewAgentSelection;
