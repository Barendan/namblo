// import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

const BlogList = ({ blogs }) => (
  <div className="blog-list">
    <Card.Group>
      { blogs?.getPosts.map(blog => (
        // <Card 
        //   fluid
        //   header={blog.title}
        //   meta={`written by ${blog.author}`}
        //   description={blog.body}
        //   // color='red' 
        // />
        
        <Card
          fluid
          key={blog._id}
          href={`/blogs/${blog._id}`}
        >
          <Card.Content>
            <Card.Header className="card-header">{blog.title}</Card.Header>
            <Card.Meta>{`written by ${blog.author}`}</Card.Meta>
            <Card.Description>{blog.body}</Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  </div>
);

export default BlogList;