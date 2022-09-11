import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

const BlogList = ({ blogs, user }) => {
  const [ sort, setSort ] = useState(false)
  const navigate = useNavigate();
  
  const blogCopy = blogs?.getPosts.map( item => { 
    return {...item, createdAt: new Date(item.createdAt)} 
  });

  const sortedPosts = sort ? 
    blogCopy.sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
  : blogCopy.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))

  if (blogs) return (
    <Card.Group>

      { sortedPosts.map( blog => {
        return user ? (
          <Card
            fluid
            key={blog._id}
            onClick={() => navigate(`/blogs/${blog._id}`) }
          >
            <Card.Content className="card-content">
              <Card.Header className="card-header">{blog.title}</Card.Header>
              <Card.Meta>{new Date(blog.createdAt).toLocaleString()}</Card.Meta>
              <Card.Description className="card-body">`{blog.body.slice(0,200)}...`</Card.Description>
            </Card.Content>
          </Card>
        ) : blog.status && (
          <Card
            fluid
            key={blog._id}
            onClick={() => navigate(`/blogs/${blog._id}`) }
          >
            <Card.Content className="card-content">
              <Card.Header className="card-header">{blog.title}</Card.Header>
              <Card.Meta>{new Date(blog.createdAt).toLocaleString()}</Card.Meta>
              <Card.Description className="card-body">`{blog.body.slice(0,200)}...`</Card.Description>
            </Card.Content>
          </Card>
        )
      })}
      
    </Card.Group>
  )
};

export default BlogList;