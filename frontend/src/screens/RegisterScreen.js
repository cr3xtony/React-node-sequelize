import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Message from '../components/Message';

const RegisterScreen = ({ history }) => {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [formSelect, setFormSelect] = useState('first');
    const [confirmPassword, setConfirmPassword] = useState('');

    const nextHandler = (e) => {
        e.preventDefault();
        setFormSelect('second');
    };

    const backHandler = (e) => {
        e.preventDefault();
        setFormSelect('first');
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Password Do Not Match');
        } else {
            if (password.length > 3) {
                await axios.post('users/register', {
                    userName,
                    email,
                    password,
                });
                history.push('/login');
            } else {
                setError('Password must be 4 character or long');
            }
        }
    };

    return (
        <Container>
            <h1>Sign Up</h1>
            {error && <Message variant='danger'>{error}</Message>}

            {formSelect === 'first' ? (
                <>
                    {/* ------------------------------FIRST FORM---------------------- */}
                    <Form>
                        <Form.Group controlId='userName'>
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter User Name'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button
                            onClick={nextHandler}
                            type='submit'
                            variant='primary'
                        >
                            NEXT
                        </Button>
                        <p>
                            Or <Link to='/Login'>Login </Link>
                        </p>
                    </Form>
                    {/* ------------------------------FIRST FORM END---------------------- */}
                </>
            ) : (
                <>
                    {/* ------------------------------SECOND FORM---------------------- */}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='password'>
                            <Form.Label>Password </Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm Password </Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm password'
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>
                        <Button onClick={backHandler} variant='secondary'>
                            Back
                        </Button>
                        <Button type='submit' variant='primary'>
                            Sign Up
                        </Button>
                        <p>
                            Or <Link to='/Login'>Login </Link>
                        </p>
                    </Form>
                    {/* ------------------------------SECOND FORM END---------------------- */}
                </>
            )}
        </Container>
    );
};

export default RegisterScreen;
