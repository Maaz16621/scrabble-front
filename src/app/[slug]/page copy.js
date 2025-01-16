import Head from 'next/head';
import axios from 'axios';
import WordFinder from "@/templates/WordFinder"; // Word Finder Template
import WordleSolver from "@/templates/WordleSolver"; // Wordle Solver Template
import { loader } from 'next/flight/server';

export const dynamic = 'force-dynamic'; // Ensure this page is always rendered on the server

const Page = async ({ params }) => {
  const { slug } = await params; 
  console.log('Slug:', slug); // Add this line
  const cleanedSlug = slug.replace('.php', '');
  
  console.log('cleanedSlug:', cleanedSlug); // Add this line
  try {
    const response = await axios.get(`https://stagging.aiwordsolver.com/admin/tool/${cleanedSlug}`);
    const pageData = response.data;

    console.log('Page Data:', pageData);

    // Redirect to homepage if page is inactive
    if (!pageData || pageData.active == 0) {
      console.log('Page is inactive or not found.');
      return <div>Page not found</div>;
    }

    // Render based on tool_template value
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

        {/* Render the appropriate tool component */}
        <ToolComponent pageData={pageData} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching page data:', error);
    console.log('Error Details:', error.response.data);
    console.log('Error Status:', error.response.status);
    console.log('Error Headers:', error.response.headers);
    return <div>Error loading page</div>;
  }
};

export async function getServerSideProps({ params }) {
  const { slug } = await params; 
  const cleanedSlug = slug.replace('.php', '');
  try {
    const response = await axios.get(`https://stagging.aiwordsolver.com/admin/tool/${cleanedSlug}`);
    const pageData = response.data;

    // Redirect to homepage if page is inactive
    if (!pageData || pageData.active == 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        pageData,
      },
    };
  } catch (error) {
    console.error('Error fetching page data:', error);
    return {
      notFound: true,
    };
  }
}

export default Page;