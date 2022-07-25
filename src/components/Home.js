import useFetch from './useFetch';
import BlogList from './BlogList.js';
import { Link } from 'react-router-dom';

const Home = () => {
    const { data: blogs, isPending, error } = useFetch('http://localhost:4000/blogs');

    return (
        <div>
            { error && <div>{error}</div> }
            { isPending && <div>Loading...</div> }
            <BlogList blogs={blogs} title="All Blogs" />
            <hr/><br/>
            <Link to='/newblog'>Post New Blog</Link>
        </div>
    )
}

export default Home;