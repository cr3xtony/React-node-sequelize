import './App.css';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
    return (
        <div className='App'>
            <Router>
                <Container>
                    <Route path='/' component={HomeScreen} exact />
                    <Route path='/login' component={LoginScreen} exact />
                    <Route path='/register' component={RegisterScreen} exact />
                </Container>
            </Router>
        </div>
    );
}

export default App;
