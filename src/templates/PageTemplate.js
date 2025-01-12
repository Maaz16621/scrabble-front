// components/templates/PageTemplate.js
const PageTemplate = ({ title, content }) => {
    return (
      <div>
        <h1>{title}</h1>
        <div>{content}</div>
      </div>
    );
  };
  
  export default PageTemplate;
  