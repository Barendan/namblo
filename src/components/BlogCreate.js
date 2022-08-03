import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Button, Checkbox, Form } from 'semantic-ui-react'

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
            <Form onSubmit={handleSubmit}>

                <Form.Field required>
                    <label>Post Title</label>
                    <input
                        type="text"
                        required
                        placeholder='Enter a title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Author Name</label>
                    <input
                        type="text"
                        placeholder='Enter your name' 
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </Form.Field>

                <Form.TextArea 
                    required
                    label='Post Content' 
                    placeholder='Write your heart out...' 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />

                <Button onClick={() => navigate('/')}>Back</Button>
                { !loading && <Button type="submit">Add Blog</Button>}
                { loading && <Button disabled type="submit">Adding Blog</Button>}
            </Form>

        </div>
    );
}
 
export default BlogCreate;