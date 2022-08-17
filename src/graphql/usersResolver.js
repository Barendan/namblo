import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
    mutation registerUser($registerInput: RegisterInput) {
        registerUser(registerInput: $registerInput) {
            email
            username
            token
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($loginInput: LoginInput) {
        loginUser(loginInput: $loginInput) {
            email
            username
            token
        }
    }
`;