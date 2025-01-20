import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../auth/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";

const Layout = ({ children, title, description, keywords, author }) => {
	const [isAuthenticated, setIsAuthenticated] = useAuth();
	const navigate = useNavigate();

	const handleClick = () => {
		localStorage.setItem('auth', false);
		setIsAuthenticated(false);
		navigate('/login');
	};

	const location = useLocation();

	const  page = location.pathname.split('/')[1];
	

	return (
		<div className='relative'>
			<Helmet>
				<meta charSet='utf-8' />
				<meta name='description' content={description} />
				<meta name='keywords' content={keywords} />
				<meta name='author' content={author} />
				<title>{title}</title>
			</Helmet>
			<div className='float-right z-50'>
					<button
						onClick={handleClick}
						className={`absolute text-xs flex flex-col items-center justify-center gap-1 ${page === 'crew' ? "text-white" : "text-gray-800"} z-50 top-6 right-6 bg-transparent hover:border hover:scale-105 transition duration-300 hover:border-red-500 hover:text-red-500 font-bold py-2 px-4 rounded`}>
						<AiOutlineLogout className='text-2xl' />
						Logout
					</button>
				</div>
			<main className='relative'>
				
				{children}
			</main>
		</div>
	);
};

Layout.defaultProps = {
	title: 'Risk Edge Solutions Makreting',
	description: 'AI Agents based marketing project',
	keywords: 'AI, AI Agents, GenAI, Marketing, AI Marketing',
	author: 'Sushma',
};

export default Layout;
