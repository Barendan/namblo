// import useFetch from './useFetch';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

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

  return (
    <div className="Home">
      <h1> Welcome to the Blog!</h1>
      { isPending && <div> Loading... </div> }
      { blogs && (
        <div>
          <BlogList blogs={blogs} />
          <hr/><br/>
          <Link to='/newblog'>Post New Blog</Link>
        </div>
      )}
    </div>
  )
}

export default Home;