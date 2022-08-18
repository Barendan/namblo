import { gql } from '@apollo/client';

export const GET_BLOG_POSTS = gql`
    query GetBlogPosts {
        getPosts {
            _id
            title
            body
            status
            createdAt
        }
    }
`;

export const CREATE_BLOG_POST = gql`
    mutation CreatePost($title: String!, $body: String!, $status: Boolean!, $createdAt: String!) {
        createPost(title: $title, body: $body, status: $status, createdAt: $createdAt) {
            _id
            title
            status
            createdAt
        }
    }
`;

export const GET_BLOG_POST = gql`
    query getBlogPost($id: ID!) {
        getPost (id: $id) {
            _id
            title
            body
            status
            createdAt
        }
    }
`;

export const REMOVE_BLOG = gql`
    mutation removeBlog ($id: ID!) {
        deletePost(id: $id) {
            _id
        }
    }
`;

export const UPDATE_BLOG = gql`
    mutation UpdatePost($id: ID!, $body: String, $title: String, $status: Boolean) {
        updatePost(id: $id, body: $body, title: $title, status: $status) {
            _id
            title
            body
            status
        }
    }
`;