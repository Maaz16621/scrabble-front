import Head from 'next/head'; // Import Head component
import axios from 'axios'; 
import WordFinder from '@/templates/WordFinder'; 
import WordleSolver from '@/templates/WordleSolver'; 

const Page = async () => {
  try {
    const response = await fetch('https://stagging.aiwordsolver.com/admin/tool/index');
    const pageData = await response.json();

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
      case 'letter_boxed':
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

        {/* Render the appropriate tool component */}
        <ToolComponent pageData={pageData} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching page data:', error);
    return <div>Error loading page</div>;
  }
};

export default Page;