// src/app/[slug]/page.js

import Head from 'next/head';
import axios from 'axios';
import WordFinder from '@/templates/WordFinder';
import WordleSolver from '@/templates/WordleSolver';

export default async function Page({ params }) {
  const { slug } = await params; 

  try {
    const response = await axios.get(`https://stagging.aiwordsolver.com/admin/tool/${slug}`);
    const pageData = await response.data;

    if (!pageData || pageData.active === 0) {
      return <div>Page not found</div>;
    }

    let ToolComponent;

    switch (pageData.tool_template) {
      case 'word_finder':
        ToolComponent = WordFinder;
        break;
      case 'wordle_solver':
        ToolComponent = WordleSolver;
        break;
      default:
        ToolComponent = () => <div>Unknown Tool</div>;
        break;
    }

    return (
      <div>
        <Head>
          <title>{pageData.page_title}</title>
          <meta name="description" content={pageData.meta_description} />
          {pageData.keywords && (
            <meta name="keywords" content={pageData.keywords} />
          )}
          <link rel="canonical" href={pageData.canonical} />
        </Head>
        <ToolComponent pageData={pageData} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching page data:', error);
    return <div>Error loading page</div>;
  }
};