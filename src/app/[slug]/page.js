import Head from 'next/head';
import axios from 'axios'; // Import axios
import WordFinder from "@/templates/WordFinder"; // Word Finder Template
import WordleSolver from "@/templates/WordleSolver"; // Wordle Solver Template

const Page = async ({ params }) => {
  const slug = params.slug;

  try {
    const response = await axios.get(`https://stagging.aiwordsolver.com/admin/tool/${slug}`);
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
export async function generateMetadata({ params }) {
  try {
    const response = await axios.get(`https://stagging.aiwordsolver.com/admin/tool/${params.slug}`);
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
