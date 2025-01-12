import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RelatedBlogs = () => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://stagging.aiwordsolver.com/admin/blog/getAllBlogs');
        setRelatedBlogs(response.data.data);  // Assuming the response contains the blog data
        console.log(relatedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="flex flex-wrap justify-between gap-4 ">
      {relatedBlogs.map((blog) => (
        <a
          href={blog.page_url}
          className="related-blog-item w-full border border-orange-500 p-2 border-1 rounded-lg transition-transform hover:shadow-xl hover:scale-105 text-gray-800 hover:text-orange-500"
          key={blog.id}
        >
          <div className="flex items-center space-x-4">
            <img
              src={`dashboard/uploads/${blog.featured_image}`}
              loading="lazy"
              alt={blog.blog_title}
              className="related-blog-image w-16 h-16 object-cover rounded-lg"
            />
            <div className="related-blog-info">
              <h3 className="related-blog-title text-sm font-semibold">{blog.blog_title}</h3>
              <p style={{ fontSize: '.75rem', lineHeight: '1rem' }} className="text-xs text-gray-500">
                {new Date(blog.updated_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default RelatedBlogs;
