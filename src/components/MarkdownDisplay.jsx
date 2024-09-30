import React from 'react';
import Markdown from 'react-markdown';

const MarkdownDisplay = ({ markdownText }) => {
	return (
		<div>
			<Markdown className='prose lg:prose-md'>{markdownText}</Markdown>
		</div>
	);
};
export default MarkdownDisplay;
