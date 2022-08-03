// import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

const BlogList = ({ blogs }) => (
  <div className="blog-list">
    <Card.Group>
      { blogs?.getPosts.map(blog => (
        <Card 
          fluid
          key={blog._id}
          href={`/blogs/${blog._id}`}
          header={blog.title}
          meta={`written by ${blog.author}`}
          description={blog.body}
          // color='red' 
        />
      ))}
    </Card.Group>
  </div>
);

export default BlogList;