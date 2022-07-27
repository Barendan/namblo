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
    const [isPending, setIsPending] = useState(false);
    const [blogCreate, { data, loading, error }] = useMutation(CREATE_BLOG_POST);
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        
        setIsPending(true);
        
        // fetch('http://localhost:4000/blogs', {
        //     method: 'POST',
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(blog)
        //     }).then(() => {
        //     setIsPending(false);
        // })

        console.log('what we got?', blog)
        console.log('bloggy', error)
        
        blogCreate({
            variables: { 
                "title": blog.title,
                "body": blog.body,
                "author": blog.author
            }
        });
        
        // navigate('/');
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
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog</button>}
            </form>
        </div>
    );
}
 
export default BlogCreate;