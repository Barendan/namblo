import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Button, Card, Form } from 'semantic-ui-react';

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
    }
 
    return (
        <div className="blog-details">
            {isLoading && <div>Loading...</div>}
            {/* {console.log('show blog', blog?.getPost)} */}

            { editActive ? (
                <div>
                    <h1>Edit your post</h1>
                    <Form onSubmit={handleSubmit}>

                        <Form.Field>
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
                            label='Post Content' 
                            placeholder='Write your heart out...' 
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />

                        <Button onClick={() => setEditActive(false)}>Back</Button>
                        { !loading && <Button type="submit">Update Post</Button>}
                        { loading && <Button disabled type="submit">Updating Post</Button>}
                    </Form>
                </div>
            ) :
            blog?.getPost && (
                <div>
                    <Card 
                        // fluid
                        header={blog.getPost.title}
                        meta={`written by ${blog.getPost.author}`}
                        description={blog.getPost.body}
                    />
                    <Button onClick={() => navigate('/')}>Back</Button>
                    <Button onClick={() => handleUpdate()}>Edit</Button>
                    <Button onClick={handleClick}>Delete</Button>
                </div>
            )}

        </div>
    );
}
 
export default BlogItem;