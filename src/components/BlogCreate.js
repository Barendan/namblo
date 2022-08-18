import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';

import { CREATE_BLOG_POST } from '../graphql/postsResolver';
 
const BlogCreate = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState(false);
    const [postCreate, { loading, error }] = useMutation(CREATE_BLOG_POST, { refetchQueries: ['GetBlogPosts'] });
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const createdAt = new Date().toLocaleString();
        const blog = { title, body, status, createdAt};
        
        postCreate({
            variables: { 
                "title": blog.title,
                "body": blog.body,
                "status": blog.status,
                "createdAt": blog.createdAt
            }
        });

        navigate('/');
    }

    // Best way to view graphQL errors
    if (error) return console.log('heres error', JSON.stringify(error, null, 2))
    
    return (
        <div className="create">
            {/* { isLoading && <div>Loading...</div> } */}

            <p className="main-header">Add a New Post</p>
            <div className="form-container">
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

                    <Form.Field 
                        label='Status' 
                        control='select' 
                        onChange={(e) => setStatus(!!e.target.value)}
                    >
                        <option value=''>Draft</option>
                        <option value='true'>Publish</option>
                    </Form.Field>

                    <Form.TextArea
                        required
                        label='Post Content' 
                        placeholder='Write your heart out...' 
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        />

                    <Button size="large" onClick={() => navigate('/')}>Back</Button>
                    { !loading && <Button size="large" color="green" type="submit">Add Post</Button>}
                    { loading && <Button disabled size="large" color="green" type="submit">Adding Post</Button>}
                </Form>
            </div>

        </div>
    );
}
 
export default BlogCreate;