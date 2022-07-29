import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const CREATE_BLOG_POST = gql`
    mutation CreatePost($title: String!, $body: String!, $author: String) {
        createPost(title: $title, body: $body, author: $author) {
            _id
            title
            author
        }
    }
`;
 
const BlogCreate = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Barenboim');
    const [blogCreate, { data, loading, error }] = useMutation(CREATE_BLOG_POST, { refetchQueries: ['GetBlogPosts'] });
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        
        blogCreate({
            variables: { 
                "title": blog.title,
                "body": blog.body,
                "author": blog.author
            }
        });
        
        navigate('/');
    }
    
    return (
        <div className="create">
            {/* { isLoading && <div>Loading...</div> } */}

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
                <button onClick={() => navigate('/')}>Back</button>
                {!loading && <button>Add Blog</button>}
                {loading && <button disabled>Adding Blog</button>}
            </form>
        </div>
    );
}
 
export default BlogCreate;