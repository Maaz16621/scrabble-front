import React from 'react';
import Head from 'next/head';
import BlogTemplate from '@/templates/BlogTemplate';
import axios from 'axios';

// BlogPage Component
const BlogPage = ({ pageData }) => {
  if (!pageData || pageData.active === 0) {
    return <div>Page not found</div>;
  }

  return (
    <div>
      <Head>
        <title>{pageData.blog_title}</title>
        <meta name="description" content={pageData.meta_description} />
        {pageData.keywords && <meta name="keywords" content={pageData.keywords} />}
        <link rel="canonical" href={pageData.canonical} />
      </Head>

      <BlogTemplate pageData={pageData} />
    </div>
  );
};

export async function getStaticPaths() {
  try {
    const res = await fetch('https://stagging.aiwordsolver.com/admin/blog/getAllBlogs');
    const data = await res.json();

    if (!data || !data.data || !Array.isArray(data.data)) {
      throw new Error('Invalid data format');
    }

    const paths = data.data.map((blog) => ({
      params: { slug: blog.page_url },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error fetching blog paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const { slug } = params;
    const response = await axios.get(`https://stagging.aiwordsolver.com/admin/blog/${slug}`);
    const pageData = response.data.data;

    return {
      props: {
        pageData,
      },
    };
  } catch (error) {
    console.error('Error fetching page data:', error);
    return {
      props: {
        pageData: null,
      },
    };
  }
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = params;
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
    metadata.robots = pageData.no_index !== 0 ? 'noindex, nofollow' : 'index, follow';

    return metadata;
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {};
  }
}

export default BlogPage;
