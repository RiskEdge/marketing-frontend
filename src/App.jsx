import './App.css';
import AgentDetails from './pages/AgentDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageNotFound from './components/PageNotFound';
import ContextForm from './components/ContextForm';
import IndexPage from './pages/IndexPage';
import CrewAgentSelection from './pages/CrewAgentSelection';
import MarketingAnalysis from './pages/CrewOutputs/MarketingAnalysis';
import SeoAnalysis from './pages/CrewOutputs/SeoAnalysis';
import ContentCreation from './pages/CrewOutputs/ContentCreation';
import LoginForm from './components/LoginForm';
import { useEffect, useState } from 'react';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import CrewOutput from './pages/CrewOutput';
import AgentResponse from './components/AgentResponse';

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<PrivateRoute />}>
						<Route path='/' element={<IndexPage />} />
						<Route path='/crew'>
							<Route path='/crew' element={<CrewAgentSelection />} />
							<Route path='marketing-analyst' element={<MarketingAnalysis />} />
							<Route path='seo-specialist' element={<SeoAnalysis />} />
							<Route path='content-writer' element={<ContentCreation />} />
						</Route>
						<Route path='/output' element={<CrewOutput />} />
						<Route path='form-details' element={<ContextForm />} />
						<Route path='/agent-details' element={<AgentDetails />} />
					</Route>
					<Route path='*' element={<PageNotFound />} />
					<Route path='/login' element={<LoginForm />} />
					<Route path='/agent-response' element={<AgentResponse />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;
