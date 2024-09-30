import './App.css';
import AgentDetails from './pages/AgentDetails';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CrewOutput from './pages/CrewOutput';
import PageNotFound from './components/PageNotFound';
import ContextForm from './components/ContextForm';
import IndexPage from './pages/IndexPage';
import CrewAgentSelection from './pages/CrewAgentSelection';
import MarketingAnalysis from './pages/CrewOutputs/MarketingAnalysis';
import SeoAnalysis from './pages/CrewOutputs/SeoAnalysis';
import ContentCreation from './pages/CrewOutputs/ContentCreation';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<IndexPage />} />
				<Route path='/crew'>
					<Route path='/crew' element={<CrewAgentSelection />} />
					<Route path='marketing-analysis' element={<MarketingAnalysis />} />
					<Route path='seo-analysis' element={<SeoAnalysis />} />
					<Route path='content-creation' element={<ContentCreation />} />
				</Route>
				{/* <Route path='/crew' element={<CrewOutput />} /> */}
				<Route path='form-details' element={<ContextForm />} />
				<Route path='/agent-details' element={<AgentDetails />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
