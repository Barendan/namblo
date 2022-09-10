import { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Dimmer, Loader, Message } from 'semantic-ui-react';

import { GET_BLOG_POSTS } from '../graphql/postsResolver';
import BlogList from './BlogList.js';
// import UserRegister from './UserRegister';
import UserLogin from './UserLogin';
import { AuthContext } from '../context/authContext';

const Home = () => {
  const { data: blogs, loading, error } = useQuery(GET_BLOG_POSTS);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [ showLogin, setShowLogin ] = useState(false);

  const onLogout = () => {
    logout();
    // navigate('/')
  }

  // if (error) return console.log('heres error', JSON.stringify(error, null, 2))

  return (
    <Container fluid className="Home">
      <div className="main-header"> Chemically Induced Dream </div>

      { loading && 
        <Dimmer inverted active>
          <Loader size="massive" inverted>Loading</Loader>
        </Dimmer>
      }

      { error && 
        <Message negative>
          <Message.Header>
            Sorry, there seems to be an error.
          </Message.Header>
          <p>Error : {error.message}.</p>
        </Message>
      }

      { blogs && 
        <div className="main-body">
          <BlogList blogs={blogs} /> 

          <hr style={{marginTop: 30}} />
          
          { blogs && user ? (
            <div>
              <hr/><br/>
              <Button
                color="red"
                size="huge"
                onClick={onLogout}
              > Logout </Button>
              <Button 
                primary
                // color="orange"
                size="huge" 
                onClick={() => navigate('/newblog') }
              >Post New Blog </Button>
            </div>
          ) : (
            <Button
              color="green"
              size="huge"
              style={{ marginTop: 20 }}
              onClick={() => setShowLogin(true)}
            > Login </Button>
          )}

        </div>
      }
      
      <UserLogin show={showLogin} onClose={() => setShowLogin(false)} />
    </Container>
  )
}

export default Home;