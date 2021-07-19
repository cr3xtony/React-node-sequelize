import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, Redirect } from 'react-router-dom';

const HomeScreen = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let history = useHistory();

    useEffect(() => {
        if (userInfo) {
            userInfo.email ? setEmail(userInfo.email) : setEmail('');
            if (userInfo.userName) {
                setUserName(userInfo.username);
            }
        }
    }, [userInfo]);
    if (!userInfo) {
        history.push('/login');
    }

    const logoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem('userInfo');
        history.push('/login');
    };
    return (
        <div>
            <h1>{email}</h1>
            <h1>{userName}</h1>
            <Button variant='primary' onClick={logoutHandler}>
                Logout
            </Button>
        </div>
    );
};

export default HomeScreen;
