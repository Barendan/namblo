// import useFetch from './useFetch';
import { gql, useQuery } from '@apollo/client';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

import BlogList from './BlogList.js';

const GET_BLOG_POSTS = gql`
  query GetBlogPosts {
    getPosts {
        _id
        title
        body
        author
    }
  }
`;

const Home = () => {
  // const { data: blogs, isPending, error } = useFetch('http://localhost:4000/blogs');
  const { data: blogs, isPending, error } = useQuery(GET_BLOG_POSTS);
  const navigate = useNavigate();

  return (
    <div className="Home">
      <h1> Welcome to the Blog!</h1>
      { isPending && <div> Loading... </div> }
      { blogs && (
        <div>
          <BlogList blogs={blogs} />
          <hr/><br/>
          <Button onClick={() => navigate('/newblog') }>Post New Blog</Button>
        </div>
      )}
    </div>
  )
}

export default Home;