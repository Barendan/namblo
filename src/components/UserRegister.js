import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { Container, Button, Form, Input, Message } from 'semantic-ui-react';
import { REGISTER_USER } from '../graphql/usersResolver';
import { AuthContext } from '../context/authContext';
import { useForm } from '../utilities/hooks';


const UserRegister = () => {
    const [ errors, setErrors ] = useState([]);
    const navigate = useNavigate();
    
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

export default UserRegister;