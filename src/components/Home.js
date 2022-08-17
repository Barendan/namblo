import { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import { GET_BLOG_POSTS } from '../graphql/postsResolver';
import BlogList from './BlogList.js';
// import UserRegister from './UserRegister';
import UserLogin from './UserLogin';
import { AuthContext } from '../context/authContext';


const Home = () => {
  const { data: blogs, isPending, error } = useQuery(GET_BLOG_POSTS);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();


  const [ showLogin, setShowLogin ] = useState(false);

  const onLogout = () => {
    logout();
    // navigate('/')
  }

  if (error) return console.log('heres error', JSON.stringify(error, null, 2))

  return (
    <div className="Home">
      <div className="main-header"> Nifty Shifty Blog!</div>
      { isPending && <div> Loading... </div> }
      { blogs && (
        <div>
          <BlogList blogs={blogs} />
          
        </div>
      )}
      { blogs && user && (
        <div>
          <hr/><br/>
          <Button 
            primary
            // color="orange"
            size="huge" 
            onClick={() => navigate('/newblog') }
          >Post New Blog </Button>
        </div>
      )}



      <Button
        color="green"
        size="huge"
        onClick={() => setShowLogin(true)}
      >Login</Button>
      <Button
        color="red"
        size="huge"
        onClick={onLogout}
      >Logout</Button>
      {/* {console.log('user here?', user)} */}

      <UserLogin show={showLogin} onClose={() => setShowLogin(false)} />
    </div>

  )
}

export default Home;