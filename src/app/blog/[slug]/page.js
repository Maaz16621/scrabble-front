import React from 'react';
import BlogTemplate from '@/templates/BlogTemplate';
import axios from 'axios';

// Function to fetch blog data
async function fetchBlogData(slug) {
  console.log('Slug:', slug); // Add this line
  const cleanedSlug = slug.endsWith('.php') ? slug.replace('.php', '') : slug;
  try {
    const response = await axios.get(`https://stagging.aiwordsolver.com/admin/blog/${cleanedSlug}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return null;
  }
}

// BlogPage Component
const BlogPage = async ({ params }) => {
  const { slug } = await params;
  const pageData = await fetchBlogData(slug);

  if (!pageData || pageData.active === 0) {
    return <div>Page not found</div>;
  }

  return (
    <div>
      <BlogTemplate pageData={pageData} />
    </div>
  );
};

// Generate static parameters for dynamic routes
export async function generateStaticParams() {
  try {
    const res = await fetch('https://stagging.aiwordsolver.com/admin/blog/getAllBlogs');
    const data = await res.json();

    if (!data || !data.data || !Array.isArray(data.data)) {
      throw new Error('Invalid data format');
    }

    return data.data.map(blog => ({
      slug: blog.page_url,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pageData = await fetchBlogData(slug);

  if (!pageData) {
    return {
      title: 'Page not found',
      robots: 'noindex, nofollow',
    };
  }

  return {
    title: pageData.blog_title,
    description: pageData.meta_description,
    keywords: pageData.keywords || '',
    alternates: {
      canonical: pageData.canonical || '',
    },
    robots: pageData.no_index !== 0 ? 'noindex, nofollow' : 'index, follow',
  };
}

export default BlogPage;
