import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children, title, description, keywords, author }) => {
	const [isAuthenticated, setIsAuthenticated] = useAuth();
	const navigate = useNavigate();

	const handleClick = () => {
		localStorage.setItem('auth', false);
		setIsAuthenticated(false);
		navigate('/login');
	};

	return (
		<div>
			<Helmet>
				<meta charSet='utf-8' />
				<meta name='description' content={description} />
				<meta name='keywords' content={keywords} />
				<meta name='author' content={author} />
				<title>{title}</title>
			</Helmet>
			<main>
				<div className='float-right m-3'>
					<button
						onClick={handleClick}
						className='bg-gray-200 hover:bg-blue-700 hover:text-white text-gray-600 font-bold py-2 px-4 rounded'>
						Logout
					</button>
				</div>
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
