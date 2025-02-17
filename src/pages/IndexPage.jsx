import React from 'react';
import Layout from '../components/Layout';
import agent from "../assets/images/agent.png"
import marketing from "../assets/images/marketing.png"

const IndexPage = () => {
	return (
		<Layout>
			<div className='min-h-screen flex flex-col md:flex-row lg:flex-row justify-center items-center py-12 pt-12 px-4 lg:px-12 bg-gray-200 '>
				<div className='max-w-3xl mx-auto shadow-xl rounded-xl bg-white flex flex-col md:flex-row gap-12 p-12'>

				<a href='/agent-details' className="max-w-xs  hover:ring-1 hover:ring-blue-500 transition duration-200 bg-white border cursor-pointer border-gray-400/50 rounded-lg ">
					
						<img className="rounded-t-lg " src={agent} alt="" />
					
					<div className="p-5">
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
						Agent Info
						</h5>
						<p className="font-normal text-gray-700">
						Get more information about the Agents and access to the services:
						</p>
						<ul className='list-disc px-5 my-3 text-gray-700'>
							<li>Edit Agent Info</li>
							<li>Delete Agent</li>
						</ul>
						
					</div>
					</a>
					{/* <a
						href='/agent-details'
						className='border broder-gray-400 p-8 rounded-md font-bold text-3xl text-blue-500 hover:bg-pink-100 hover:text-pink-500'>
						<div>Agent Info</div>
					</a> */}

				<a href='/crew' className="max-w-xs hover:ring-1 hover:ring-blue-500 transition duration-200 bg-white border cursor-pointer border-gray-400/50 rounded-lg ">
						<img className="rounded-t-lg " src={marketing} alt="" />
					<div className="p-5">
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
						Marketing
						</h5>
						<p className="mb-3 font-normal text-gray-700">
						Get to know our marketing functions such as:
						</p>
						<ul className='list-disc px-5 my-3 text-gray-700'>
							<li>SEO Analysis</li>
							<li>Content Creation</li>
							<li>Marketing Analysis</li>
						</ul>
					</div>
					</a>
					{/* <a
						href='/crew'
						className='border broder-gray-400 p-8 rounded-md font-bold text-3xl text-blue-500 hover:bg-pink-100 hover:text-pink-500'>
						<div>Marketing</div>
					</a>  */}
				</div>
			</div>
		</Layout>
	);
};
export default IndexPage;
