import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Container, Button, Form, Input, Message, Modal } from 'semantic-ui-react';
import { LOGIN_USER } from '../graphql/usersResolver';
import { AuthContext } from '../context/authContext';
import { useForm } from '../utilities/hooks';


const UserLogin = ({ show, onClose }) => {
    const context = useContext(AuthContext);
    const [ errors, setErrors ] = useState([]);
    
    function loginUserCallback() {
        loginUser();
    }
    
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
      email: '',
      password: '',
    })
    
    const [ loginUser, { loading } ] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData } }) {
          context.login(userData);
          setErrors([]);
          onClose();
        },
        onError({ graphQLErrors }) {
          setErrors(graphQLErrors);
        },
        variables: { loginInput: values }
    })

    const closeErrors = () => {
        setErrors([]);
        onClose();
    }

    return (
        <Modal
            size="tiny"
            open={show}
            onClose={onClose}
        >
            <Modal.Header>Login to your account</Modal.Header>
            
            <Modal.Content>
                <Form>
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

                    { errors.map( function(error, i) {
                        return (
                            <Message key={i} negative>
                                { error.message }
                            </Message>
                        )
                    })}


                </Form>
            </Modal.Content>

            <Modal.Actions>
                    <Button negative onClick={closeErrors}>
                        Back
                    </Button>
                    <Button positive onClick={onSubmit}>
                        Login
                    </Button>
            </Modal.Actions>

        </Modal>
    )
}

export default UserLogin;