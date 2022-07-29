import { useState } from 'react';
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

const UPDATE_BLOG = gql`
    mutation UpdatePost($id: ID!, $body: String, $title: String, $author: String) {
        updatePost(id: $id, body: $body, title: $title, author: $author) {
        _id
        title
        body
        author
        }
    }
`;
 
const BlogItem = () => {
    const { id } = useParams();
    const { isLoading, data: blog } =  useQuery(GET_BLOG_POST, { variables: { id: id } });
    const [blogRemove] = useMutation(REMOVE_BLOG,{ refetchQueries: ['GetBlogPosts'] });
    const [blogUpdate, { data, loading, error }] = useMutation(UPDATE_BLOG);
    
    const [editActive, setEditActive] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Barenboim');

    const navigate = useNavigate();
    
    const handleClick = () => {
        blogRemove({
            variables: { id },
        });
        navigate('/');
    }

    const handleUpdate = () => {
        setEditActive(true);
        setTitle(blog?.getPost.title)
        setBody(blog?.getPost.body)
        setAuthor(blog?.getPost.author)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        
        blogUpdate(
            {variables: { id,
                "title": blog.title,
                "body": blog.body,
                "author": blog.author
            }}
        );
        
        setEditActive(false);
        // navigate('/');
    }
 
    return (
        <div className="blog-details">
            {isLoading && <div>Loading...</div>}
            {/* {console.log('show blog', blog?.getPost)} */}

            { editActive ? (
                <div>
                    <h2>Add a New Blog</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Blog Title</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Blog Body:</label>
                        <textarea
                            required
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <label>Blog author:</label>
                        <select
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        > 
                            <option value="Barenboim">Barenboim</option>
                            <option value="Kennedy">Kennedy</option>
                            <option value="Simone">Simone</option>
                        </select>
                        {!loading && <button>Update Blog</button>}
                        {loading && <button disabled>Updating Blog</button>}
                    </form>
                </div>
            ) :
            blog?.getPost && (
                <article >
                    <h2>{blog.getPost.title}</h2>
                    <p>Written by {blog.getPost.author}</p>
                    <div>{blog.getPost.body}</div>
                    <button onClick={() => navigate('/')}>Back</button>
                    <button onClick={() => handleUpdate()}>Edit</button>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}

        </div>
    );
}
 
export default BlogItem;