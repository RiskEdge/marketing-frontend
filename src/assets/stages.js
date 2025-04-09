import loadingGif from './gifs/loading.gif';

import marketTrends from './gifs/marketing analysis/analyzing_market_trends.gif';
import targetAudience from './gifs/marketing analysis/Target Evaluation.gif';
import analyzingCompetitors from './gifs/marketing analysis/analyzing competitors.gif';
import socialMediaStrategies from './gifs/marketing analysis/social_media_strategies.gif';
import marketGaps from './gifs/marketing analysis/analyzing_market_gaps.gif';
import finalizingReport from './gifs/marketing analysis/finalizing_report.gif';

const marketingAgentStages = [
	{ stage: 'Analyzing Market Trends...', image: marketTrends, duration: 10000 },
	{ stage: 'Identifying Target Audience...', image: targetAudience, duration: 11000 },
	{ stage: 'Analyzing Competitors...', image: analyzingCompetitors, duration: 9000 },
	{
		stage: 'Evaluating Competitor Strategies on Social Media Platforms...',
		image: socialMediaStrategies,
		duration: 8000,
	},
	{ stage: 'Identifying Market Gaps...', image: marketGaps, duration: 10000 },
	{ stage: 'Generating Marketing Strategies...', image: marketTrends, duration: 10000 },
	{ stage: 'Finalizing Report', image: finalizingReport, duration: 13000 },
];

const contentWriterAgentStages = [
	{ stage: 'Researching Topic...', image: loadingGif, duration: 7000 },
	{ stage: 'Gathering Information...', image: analyzingCompetitors, duration: 8000 },
	{ stage: 'Generating Content Outline...', image: marketTrends, duration: 5000 },
	{ stage: 'Writing Draft...', image: finalizingReport, duration: 7000 },
	{ stage: 'Editing & Proofreading...', image: targetAudience, duration: 7000 },
	{ stage: 'Finalizing Content...', image: finalizingReport, duration: 9000 },
];

const seoAgentStages = [
	{ stage: 'Visiting the website...', image: analyzingCompetitors, duration: 9000 },
	{ stage: 'Analyzing Performance...', image: marketTrends, duration: 10000 },
	{ stage: 'Analyzing SEO...', image: marketGaps, duration: 8000 },
	{ stage: 'Finding Errors/Issues...', image: socialMediaStrategies, duration: 9000 },
	{ stage: 'Final SEO Review...', image: finalizingReport, duration: 11000 },
];

export { marketingAgentStages, contentWriterAgentStages, seoAgentStages };
