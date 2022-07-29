import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';

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

const REMOVE_BLOG = gql`
    mutation removeBlog ($id: ID!) {
        deletePost(id: $id) {
            _id
        }
    }
`;
 
const BlogItem = () => {
    const { id } = useParams();
    const { isLoading, error, data: blog } =  useQuery(GET_BLOG_POST, { variables: { id: id } })
    const [blogRemove] = useMutation(REMOVE_BLOG,{ refetchQueries: ['GetBlogPosts'] });
    const navigate = useNavigate();
    
    const handleClick = () => {
        blogRemove({
            variables: { id },
        });
        navigate('/');
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