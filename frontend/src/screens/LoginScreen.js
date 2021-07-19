import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Col, Form, Row } from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Message from '../components/Message';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    let history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };
        try {
            const { data } = await axios.post(
                '/users/login',
                { email, password },
                config
            );
            localStorage.setItem('userInfo', JSON.stringify(data));
            if (data) {
                history.push('/');
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
                <p>
                    Or <Link to='/register'>Register </Link>
                </p>
            </Form>
        </FormContainer>
    );
};

export default LoginScreen;
