// import useFetch from './useFetch';
import BlogList from './BlogList.js';

import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

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
        <div>
            { error && <div>{error}</div> }
            { isPending && <div>Loading...</div> }

            { console.log('bloggy', blogs) }
            <BlogList blogs={blogs} title="All Blogs" />
            <hr/><br/>
            <Link to='/newblog'>Post New Blog</Link>
        </div>
    )
}

export default Home;