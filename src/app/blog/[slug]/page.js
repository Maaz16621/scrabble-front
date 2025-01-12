import React from 'react';
import Head from 'next/head';
import BlogTemplate from '@/templates/BlogTemplate';
import axios from 'axios'; // Import axios
// BlogPage Component
const BlogPage = async ({ params }) => {
  const { slug } = await params; // Await params before accessing its properties
  try {
    const response = await axios.get(`https://stagging.aiwordsolver.com/admin/blog/${slug}`);
    const pageData = response.data.data;

    // Redirect to homepage if page is inactive
    if (!pageData || pageData.active == 0) {
      return <div>Page not found</div>;
    }

    // Render based on tool_template value
 

   

    return (
      <div>
        <Head>
          <title>{pageData.blog_title}</title>
          <meta name="description" content={pageData.meta_description} />
          {pageData.keywords && (
            <meta name="keywords" content={pageData.keywords} />
          )}
          <link rel="canonical" href={pageData.canonical} />
        </Head>

        {/* Render the appropriate tool component */}
        <BlogTemplate pageData={pageData} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching page data:', error);
    return <div>Error loading page</div>;
  }
};

// Static Generation for Blog Paths
export async function getStaticPaths() {
  try {
    const res = await fetch('https://stagging.aiwordsolver.com/admin/blog/getAllBlogs');
    const data = await res.json();

    const paths = data.data.map((blog) => ({
      params: { slug: blog.page_url }, // dynamic slug from the data
    }));

    return {
      paths,
      fallback: 'blocking', // waits for data to be generated at request time if it's not pre-built
    };
  } catch (error) {
    console.error('Error fetching blog paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}


export async function generateMetadata({ params }) {
  try {
    const { slug } = await params; // Await params before accessing its properties
    const response = await axios.get(`https://stagging.aiwordsolver.com/admin/blog/${slug}`);
    const pageData = response.data.data;
    const metadata = {
      title: pageData.page_title,
      description: pageData.meta_description,
      keywords: pageData.keywords,
      alternates: {
        canonical: pageData.canonical || '',
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

export default BlogPage;
