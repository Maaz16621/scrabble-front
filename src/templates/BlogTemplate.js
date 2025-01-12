"use client";
import RelatedBlogs from '@/components/RelatedBlogs';
import React, { useState, useEffect } from 'react';

const BlogTemplate = ({ pageData }) => {
  const [tocItems, setTocItems] = useState([]);
  
  useEffect(() => {
    const updatedContent = pageData.content;
    
    // Define regex to match h2, h3, h4 headings
    const headingPattern = /<(h[2-4])\b[^>]*>(.*?)<\/\1>/gi;

    const matches = [...updatedContent.matchAll(headingPattern)];
    
    let h2Counter = 0;
    let h3Counters = {};
    const newTocItems = [];

    matches.forEach((match, index) => {
      const tag = match[1]; // h2, h3, or h4
      const content = match[2]; // Heading content
      const anchor = 'heading-' + index; // Unique anchor ID

      // Handle numbering based on the heading tag
      if (tag === 'h2') {
        h2Counter++;
        newTocItems.push({
          tag,
          text: content,
          anchor,
          number: h2Counter,
          class: 'text-sm',
        });
        h3Counters[h2Counter] = 0;
      } else if (tag === 'h3') {
        h3Counters[h2Counter]++;
        newTocItems.push({
          tag,
          text: content,
          anchor,
          number: `${h2Counter}.${h3Counters[h2Counter]}`,
          class: 'text-sm pl-4',
        });
      } else if (tag === 'h4') {
        newTocItems.push({
          tag,
          text: content,
          anchor,
          number: `${h2Counter}.${h3Counters[h2Counter]}.0`,
          class: 'text-sm pl-6',
        });
      }

      // Replace heading with anchor link
      updatedContent.replace(
        match[0],
        `<${tag} id='${anchor}'>${content}</${tag}>`
      );
    });

    setTocItems(newTocItems);

  }, [pageData.content]);

  return (
    <main className="hero-results">
      <div className="z-10 px-4 sm:px-6 md:px-8 w-full mt-8 mx-auto max-w-[1400px] flex flex-col md:flex-row justify-between">
        {/* Left Column (70%) - Blog Content */}
        <div className="w-full md:w-3/4 p-4 sm:p-6 md:p-8">
      
  <img 
    src={'https://stagging.aiwordsolver.com/storage/uploads/blog/'+pageData.featured_image} 
    alt="Main Blog Image" 
    sizes="(max-width: 600px) 100vw, 600px"
style={{maxHeight:'600px',width:'100%', height:"auto"}}
    className="w-full rounded-xl shadow-lg border object-fill mb-6 max-w-screen-xl"
    fetchPriority="high"
    />
          <h1 className="text-5xl font-bold mb-6">{pageData.title}</h1>

          <div
            className="mb-4"
            id="blogContentDisplay"
            dangerouslySetInnerHTML={{ __html: pageData.content }}
          />
        </div>

        {/* Right Column (30%) - Table of Contents and Follow Us */}
        <div className="md:w-1/4 p-4 space-y-8">
          {/* Follow Us Section (Non-sticky) */}
          <div className="space-y-4">
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/aiwordsolver"
                className="text-oxford-blue hover:text-yellow-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
              >
                <i className="fab fa-facebook-f fa-lg" />
              </a>
              <a
                href="https://x.com/aiwordsolver"
                className="text-oxford-blue hover:text-yellow-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Twitter page"
              >
                <i className="fab fa-twitter fa-lg" />
              </a>
              <a
                href="https://www.instagram.com/ai_word_solver/"
                className="text-oxford-blue hover:text-yellow-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram profile"
              >
                <i className="fab fa-instagram fa-lg" />
              </a>
              <a
                href="https://www.linkedin.com/company/aiwordsolver/"
                className="text-oxford-blue hover:text-yellow-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our LinkedIn page"
              >
                <i className="fab fa-linkedin-in fa-lg" />
              </a>
              <a
                href="https://www.pinterest.com/aiwordsolver/"
                className="text-oxford-blue hover:text-yellow-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Pinterest profile"
              >
                <i className="fab fa-pinterest-p fa-lg" />
              </a>
            </div>
          </div>

          <RelatedBlogs/>
          {/* Table of Contents (Sticky) */}
          <div className="hidden md:block sticky top-4">
  <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
  <div id="tableOfContents" className="list-disc list-inside">
    {tocItems.map((item) => (
      <p key={item.anchor} className="toc-item">
      <a href={`#${item.anchor}`} style={{ lineHeight: '1rem !important' }} className={item.class}>
        <span className="font-bold">{item.number}.</span> {item.text}
      </a>
    </p>
    ))}
  </div>
</div>
        </div>
      </div>
      {/* Mobile Table of Contents */}
      <div id="stickyToc" className="fixed md:hidden sm:block bottom-0 w-full shadow-md z-10">
        <button
          id="toggleToc"
          className="w-full bg-orange-web text-left px-4 text-white py-2 flex justify-between items-center"
        >
          <span className="text-black">Table of Contents</span>
          <i
            id="toggleIcon"
            className="fas fa-chevron-up text-black transition-transform duration-300"
          />
        </button>
        <div
          id="mobileToc"
          className="overflow-hidden transition-all bg-white px-4 duration-300 ease-in-out max-h-0"
        >
          <div className="list-disc list-inside my-2 pb-2">
            {tocItems.map((item) => (
              <p key={item.anchor} className={item.class}>
                <a href={`#${item.anchor}`} className="hover:underline">
                  <span className="font-bold">{item.number}.</span> {item.text}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogTemplate;

     {/* Related Blogs Section */}
          {/*  */}
