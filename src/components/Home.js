// import useFetch from './useFetch';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Button, Form, Input, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

import { GET_BLOG_POSTS } from '../graphql/postsResolver';
import BlogList from './BlogList.js';


import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useForm } from '../utilities/hooks';

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

  function registerUserCallback() {
    // console.log('callback hit');
    registerUser();
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })


  const context = useContext(AuthContext);
  const [ registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      // navigate('/');
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: values }
  })


  return (

    // <div className="Home">
    //   <div className="main-header"> Nifty Shifty Blog!</div>
    //   { isPending && <div> Loading... </div> }
    //   { blogs && (
    //     <div>
    //       <BlogList blogs={blogs} />
    //       <hr/><br/>
    //       <Button 
    //         primary
    //         // color="orange"
    //         size="huge" 
    //         onClick={() => navigate('/newblog') }
    //       >Post New Blog </Button>
    //     </div>
    //   )}
    // </div>

    <Container>
      <Form onSubmit={() => console.log('form submitted')} >
        <Form.Field
          control={Input}
          label="Username"
          name="username"
          onChange={onChange}
          />
        <Form.Field
          control={Input}
          label="Email"
          name="email"
          onChange={onChange}
          />
        <Form.Field
          control={Input}
          label="Password"
          name="password"
          onChange={onChange}
          />
        <Form.Field
          control={Input}
          label="Confirm password"
          name="confirmPassword"
          onChange={onChange}
          />
        { errors.map( function(error, i) {
          return (
            <Message key={i} negative>
              { error.message }
            </Message>
            )
          })}
        <Button onClick={onSubmit}>
          Register
        </Button>
      </Form>
    </Container>

  )
}

export default Home;