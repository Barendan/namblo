// import useFetch from './useFetch';
import { useQuery, useMutation } from '@apollo/client';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

import { GET_BLOG_POSTS } from '../graphql/postsResolver';
import BlogList from './BlogList.js';


import { useContext, useState } from 'react';
import { authContext } from '../context/authContext';
import { useForm } from '../utility/hooks';

import { gql } from 'graphql-tag';

const REGISTER_USER = gql`
  mutation registerUser(
    $registerInput: RegisterInput
  ) {
    registerUser(
      registerInput: $registerInput
    ) {
      email
      username
      token
    }
  }
`;


const Home = () => {
  // const { data: blogs, isPending, error } = useFetch('http://localhost:4000/blogs');
  const { data: blogs, isPending, error } = useQuery(GET_BLOG_POSTS);
  const navigate = useNavigate();
  const [ errors, setErrors ] = useState([]);


  const context = useContext(authContext);
  const [ registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      // navigate('/');
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    }
  })


  return (
    <div className="Home">
      <div className="main-header"> Nifty Shifty Blog!</div>
      { isPending && <div> Loading... </div> }
      { blogs && (
        <div>
          <BlogList blogs={blogs} />
          <hr/><br/>
          <Button 
            primary
            // color="orange"
            size="huge" 
            onClick={() => navigate('/newblog') }
          >Post New Blog </Button>
        </div>
      )}
    </div>
  )
}

export default Home;