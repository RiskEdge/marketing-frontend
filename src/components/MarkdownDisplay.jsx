import React from 'react';
import Markdown from 'react-markdown';

const MarkdownDisplay = ({ markdownText }) => {
  // Custom components for Markdown elements
  const components = {
    // Customize headings
    h1: ({ node, ...props }) => <h1 className="text-xl md:text-3xl font-bold my-4" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-base md:text-xl font-semibold my-3" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-base md:text-xl font-medium my-2" {...props} />,
    h4: ({ node, ...props }) => <h3 className="text-lg md:text-2xl font-medium my-2" {...props} />,

    // Customize paragraphs
    p: ({ node, ...props }) => <p className="text-sm md:text-base my-2 leading-6 md:leading-7" {...props} />,

    // Customize lists
    ul: ({ node, ...props }) => <ul className=" my-2" {...props} />,
    ol: ({ node, ...props }) => <ol className=" my-2" {...props} />,
    li: ({ node, ...props }) => <li className="text-sm leading-6 md:leading-7 md:text-base my-1 text-wrap" {...props} />,

    // Customize links
    a: ({ node, ...props }) => (
      <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
    ),

    // Customize strong/bold text
    strong: ({ node, ...props }) => <strong className="font-bold text-base md:text-lg" {...props} />,

    // Customize emphasis/italic text
    em: ({ node, ...props }) => <em className="italic" {...props} />,

    // Customize code blocks
    code: ({ node, ...props }) => (
      <code className=" p-1 rounded text-sm font-mono" {...props} />
    ),
    pre: ({ node, ...props }) => (
      <pre className="bg-gray-800 p-4 rounded my-2 overflow-x-scroll text-wrap" {...props} />
    ),

    // Customize blockquotes
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2" {...props} />
    ),
  };

  return (
    <Markdown className="prose text-black flex-wrap text-sm leading-6 flex flex-col max-h-500px" components={components}>
      {markdownText}
    </Markdown>
  );
};

export default MarkdownDisplay;