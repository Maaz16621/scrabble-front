import Head from 'next/head';
import axios from 'axios'; // Import axios
import WordFinder from "@/templates/WordFinder"; // Word Finder Template
import WordleSolver from "@/templates/WordleSolver"; // Wordle Solver Template

const Page = async ({ params }) => {
  const slug = params.slug;

  try {
    const response = await axios.get(`https://stagging.aiwordsolver.com/admin/tool/index?slug=${slug}`);
    const pageData = response.data;

    // Redirect to homepage if page is inactive
    if (!pageData || pageData.active == 0) {
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
        case 'letter_boxed':
          ToolComponent = WordleSolver;
          break;
      default:
        ToolComponent = () => <div>Unknown Tool</div>;
        break;
    }

    return (
      <div>
       

        {/* Render the appropriate tool component */}
        <ToolComponent pageData={pageData} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching page data:', error);
    return <div>Error loading page</div>;
  }
};

export async function getStaticPaths() {
  try {
    const response = await axios.get('https://stagging.aiwordsolver.com/admin/tool/getAllTools');
    const tools = response.data || [];

    const paths = tools.map((tool) => ({
      params: { slug: tool.page_url },
    }));

    return {
      paths,
      fallback: 'blocking', // 'blocking' ensures that ISR works properly
    };
  } catch (error) {
    console.error('Error fetching tool paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function generateMetadata({ params }) {
  try {
    const response = await axios.get(`https://stagging.aiwordsolver.com/admin/tool/index?slug=${params.slug}`);
    const pageData = response.data;

    const metadata = {
      title: pageData.page_title,
      description: pageData.meta_description,
      keywords: pageData.keywords,
      alternates: {
        canonical: pageData.canonical || '',  // Set canonical URL if available
      },
    };

    // Handle no_index logic
    if (pageData.no_index !== 0) {
      metadata.robots = 'noindex, nofollow';
    } else {
      metadata.robots = 'index, follow';
    }

    return metadata;
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {};
  }
}
export async function generateStaticParams() {
  try {
    const response = await axios.get('https://stagging.aiwordsolver.com/admin/tool/getAllTools');
    const tools = response.data || [];

    return tools.map(tool => ({
      slug: tool.page_url,
    }));
  } catch (error) {
    console.error('Error fetching tool paths:', error);
    return [];
  }
}

export default Page;
