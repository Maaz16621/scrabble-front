import React from "react";

// This function will fetch the blog post data based on the slug
const BlogPost = ({ blog }) => {
  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{blog.blog_title}</h1>
      <img src={`https://stagging.aiwordsolver.com/${blog.featured_image}`} alt={blog.blog_title} />
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;

  // Fetch the blog post data from your backend API
  const res = await fetch(`https://stagging.aiwordsolver.com/admin/blog/${slug}`);
  const blog = await res.json();

  // Check if the blog data is returned successfully
  if (!blog.success || !blog.data) {
    return {
      notFound: true, // Show a 404 page if blog data is not found
    };
  }

  return {
    props: {
      blog: blog.data[0], // Assuming the response has a 'data' array with the blog details
    },
  };
}

export default BlogPost;
