import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
// import { useQuery } from 'react-query';

const GET_BLOG_POST = gql`
    query getBlogPost($id: ID!) {
        getPost (id: $id) {
            _id
            title
            body
            author
        }
    }
`;
 
const BlogItem = () => {
    const { id } = useParams();
    // const { isLoading, error, data: blog, } =  useQuery(['blogItem', id], () => fetch('http://localhost:4000/blogs/' + id).then(res => res.json()) )
    const { isLoading, error, data: blog } =  useQuery(GET_BLOG_POST, { variables: { id: id } })
    const navigate = useNavigate();
    
    const handleClick = () => {
        fetch('http://localhost:4000/blogs/'+ blog._id, {
            method: 'DELETE'
        }).then(() => {
            navigate('/');
        })
    }
 
    return (
    <div className="blog-details">
        {error && <div>{error}</div>}
        {isLoading && <div>Loading...</div>}

        {/* {console.log('showy', blog)} */}
        {/* { console.log('bloggy', JSON.stringify(error, null, 2)) } */}

        { blog?.getPost && (
            <article >
                <h2>{blog.getPost.title}</h2>
                <p>Written by {blog.getPost.author}</p>
                <div>{blog.getPost.body}</div>
                <button onClick={handleClick}>Delete</button>
            </article>
        )}
    </div>
    );
}
 
export default BlogItem;