import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
 
const BlogItem = () => {
    const { id } = useParams();
    const { isLoading, error, data: blog, } =  useQuery(['blogItem', id], () => fetch('http://localhost:4000/blogs/' + id).then(res => res.json()) )
    const navigate = useNavigate();
    
    const handleClick = () => {
        fetch('http://localhost:4000/blogs/'+ blog.id, {
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

        { blog && (
            <article >
                <h2>{blog.title}</h2>
                <p>Written by {blog.author}</p>
                <div>{blog.body}</div>
                <button onClick={handleClick}>Delete</button>
            </article>
        )}
    </div>
    );
}
 
export default BlogItem;