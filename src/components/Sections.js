import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Sections = ({ sections = [] }) => {
  const pathname = usePathname();
  const [sortedSections, setSortedSections] = useState([]);
  const [currentPage, setCurrentPage] = useState('');
  const [tools, setTools] = useState([]); // State to store tools

  useEffect(() => {
    setCurrentPage(pathname.split('/').pop());
  }, [pathname]);

  useEffect(() => {
    setSortedSections([...sections].sort((a, b) => a.section_order - b.section_order));
  }, [sections]);

  // Fetch tools data from the API
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch('https://stagging.aiwordsolver.com/admin/tool/getAllTools');
        const data = await response.json();
        setTools(data); // Update the tools state with the fetched data
      } catch (error) {
        console.error('Error fetching tools:', error);
      }
    };

    fetchTools();
  }, []); // Empty dependency array to run the fetch only once when the component mounts

  const renderSection = (section) => {
    switch (section.section_type) {
      case 'how_to_v2':
        return <HowToV2Section section={section} />;
      case 'how_to':
        return <HowToSection section={section} />;
      case 'key_features':
        return <KeyFeaturesSection section={section} />;
      case 'faqs':
        return <FAQsSection section={section} />;
      case 'text':
        return <TextSection section={section} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {sortedSections.map((section) => (
        <div key={section.id}>{renderSection(section)}</div>
      ))}
      <ToolsSection currentPage={currentPage} tools={tools} />
    </div>
  );
};


const HowToV2Section = ({ section }) => {
    const { heading, subtext, steps } = JSON.parse(section.section_content);
    return (
        <div className="container mx-auto mt-6 p-6">
            <div className="flex flex-col md:flex-row gap-6 max-w-7xl lg:px-12 md:px-8 mx-auto px-4 my-6">
                <div className="md:w-2/5">
                    <h2 className="text-3xl font-bold text-left">{heading}</h2>
                    <p className="text-gray-600 text-left mt-2">{subtext}</p>
                </div>
                <div className="md:w-3/5">
                    {steps.map((step, index) => (
                        <div key={index} className="flex mb-4">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-web text-black font-semibold flex-shrink-0 shadow-lg border-3">
                                {index + 1}
                            </div>
                            <div className="flex-grow pl-4">
                                <span className="text-lg font-base leading-6">{step}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const HowToSection = ({ section }) => {
    // Parse the section content into an array of steps
    const steps = JSON.parse(section.section_content);
  
    const colors = ['yellow', 'blue', 'green', 'red'];
  
    return (
      <div className="container flex flex-col justify-center max-w-7xl lg:px-12 md:px-8 mx-auto px-4 my-6">
        <div className="container mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">{section.section_heading}</h1>
          <p className="text-lg text-gray-600 mt-2">{section.section_subtext}</p>
        </div>
        <div className="flex flex-wrap mx-4">
          {steps.map((step, index) => (
            <div key={index} className="w-full md:w-1/2 xl:w-1/4 px-4 mb-8">
              <div className="step-box shadow-lg p-6 bg-white rounded-lg flex flex-col items-center">
                <div className={`number-label bg-${colors[index % colors.length]}-400 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold`}>
                  {index + 1}
                </div>
                <h2 className="text-lg font-bold mb-4 text-center">{step.title}</h2>
                <p className="text-sm text-center">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const KeyFeaturesSection = ({ section }) => {
    const features = JSON.parse(section.section_content);
    const featureArray = Object.keys(features).map((key) => ({
      title: key,
      description: features[key],
    }));
    const faIcons = [
      'fa-search', 'fa-thumbs-up', 'fa-cog', 'fa-lightbulb', 'fa-chart-line', 
      'fa-star', 'fa-heart', 'fa-bolt', 'fa-comments', 'fa-user-check'
    ];
    return (
      <div className="container mx-auto py-3 px-6 lg:px-16 max-w-7xl">
        <h2 className="text-4xl text-center font-bold text-gray-800">{section.section_heading}</h2>
        <p className="text-lg text-center text-gray-600 mt-2 mb-2">{section.section_subtext}</p>
        <div className="flex flex-wrap justify-center mb-12">
          {featureArray.map((feature, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mt-10 flex flex-col">
              <div className={`feature-card group p-6 ${index % 2 ? 'bg-orange-web' : 'bg-white'} rounded-lg shadow transition duration-300 ease-in-out hover:shadow-xl h-full flex flex-col`}>
                <div className="flex items-center mb-4">
                  <div className={`icon w-12 h-12 min-w-[3rem] max-w-[3rem] min-h-[3rem] max-h-[3rem] ${index % 2 ? 'bg-white' : 'bg-orange-web'} rounded-full flex items-center justify-center mr-4`}>
                    <i className={`fas ${faIcons[index % faIcons.length]} text-${index % 2 ? 'orange-web' : 'white'} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-black">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const FAQsSection = ({ section }) => {
    const faqs = JSON.parse(section.section_content);
    const faqArray = faqs.map((faq) => {
      const [question, answer] = faq.split(' A: ');
      return { question: question.replace('Q: ', ''), answer };
    });
  
    useEffect(() => {
      // Accordion functionality when component is mounted
      const accordionItems = document.querySelectorAll('.accordion-item');
  
      // Check if there are any accordion items before proceeding
      if (accordionItems.length === 0) {
        console.log('No accordion items found. Exiting script.');
        return; // Exit if no accordion items are found
      }
  
      // Open the first accordion item by default
      accordionItems[0].classList.add('open');
  
      const headers = document.querySelectorAll('.accordion-header');
  
      headers.forEach(header => {
        header.addEventListener('click', () => {
          const parent = header.parentElement;
  
          // Close all accordion items
          accordionItems.forEach(item => {
            item.classList.remove('open');
          });
  
          // Open the clicked accordion item
          parent.classList.add('open');
        });
      });
  
      // Clean up event listeners when component unmounts
      return () => {
        headers.forEach(header => {
          header.removeEventListener('click', () => {});
        });
      };
    }, []); // Empty dependency array means this runs once after the initial render
  
    return (
      <div className="container mx-auto max-w-7xl px-4 py-6 my-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600 mt-2 mb-6 text-center">Here are some common questions and answers to help you out.</p>
        <div className="accordion">
          {faqArray.map((faq, index) => (
            <div key={index} className="accordion-item">
              <button className="accordion-header">
                <h3>{faq.question}</h3>
              </button>
              <div className="accordion-body">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

const TextSection = ({ section }) => {
    // No need to parse the HTML string as JSON
    const content = section.section_content;

    return (
        <div className="container mx-auto my-3 px-6 lg:px-15 max-w-7xl">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};
const ToolsSection = ({ currentPage, tools }) => {
    return (
      <div className="container flex flex-col justify-center max-w-7xl lg:px-12 md:px-8 mx-auto px-4 my-6">
        {/* Section Heading */}
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Other Word Solvers</h2>
          <p className="text-lg text-gray-600 mt-2">Try out other advanced tools of AIWordSolver to become a master.</p>
        </div>
  
        <div className="flex flex-wrap justify-center mx-4">
          {tools.map((tool, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
              <a
                href={tool.page_url}
                target="_blank"
                rel="noopener noreferrer"
                className="tool-box border border-orange-500 p-3 bg-white rounded-lg flex flex-row items-center transition-transform hover:shadow-xl hover:scale-105 text-gray-800 hover:text-orange-500"
              >
                {/* Tool Icon */}
                <div className="icon text-4xl text-orange-500 mr-2">
                  <img
                    src={`https://stagging.aiwordsolver.com/storage/tool-icons/`+tool.tool_icon}
                    alt={`Tool icon for ${tool.hero_title}`}
                    width="40"
                    height="40"
                    className="inline-block"
                    loading="lazy"
                  />
                </div>
                {/* Tool Name */}
                <p className="text-lg font-bold text-center">{tool.hero_title}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  };
export default Sections;
