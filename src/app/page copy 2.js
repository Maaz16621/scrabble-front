import axios from 'axios'; // Import axios
import WordFinder from "@/templates/WordFinder"; // Word Finder Template
import WordleSolver from "@/templates/WordleSolver"; // Wordle Solver Template

// Function to fetch page data (async)
async function fetchPageData() {
  try {
    const response = await axios.get(`https://stagging.aiwordsolver.com/admin/tool/index`);
    return response.data;
  } catch (error) {
    console.error('Error fetching page data:', error);
    return null;
  }
}

// Server Component (async)
const Page = async ({ params }) => {
  
  const pageData = await fetchPageData(); // Fetch page data

  if (!pageData || pageData.active === 0) {
    return <div>Page not found</div>;
  }

  let ToolComponent;

  // Render based on tool template value
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
      <ToolComponent pageData={pageData} />
    </div>
  );
};

export async function generateMetadata({ params }) {
  
  const pageData = await fetchPageData();

  if (pageData) {
    const metadata = {
      title: pageData.page_title,
      description: pageData.meta_description,
      keywords: pageData.keywords,
      alternates: {
        canonical: pageData.canonical || '',
      },
    };

    // Handle no_index logic
    metadata.robots = pageData.no_index !== 0 ? 'noindex, nofollow' : 'index, follow';

    return metadata;
  }

  return {};
}

export default Page;
