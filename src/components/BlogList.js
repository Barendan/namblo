import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

const BlogList = ({blogs, title}) => (

  <div className="blog-list">

    <Card.Group>
      { blogs?.getPosts.map(blog => (
        <Card 
          fluid
          key={blog._id}
          href={`/blogs/${blog._id}`}
          // color='red' 
          header={blog.title}
          meta={`written by ${blog.author}`}
          description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
        />
      ))}
    </Card.Group>

  </div>
)

export default BlogList;