import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import LandingPage from '../src/components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import NavBar from './components/views/NavBar/NavBar';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
function App() {
    return (
        <>
            <NavBar />
            <Router>
                <div>
                    <hr />

                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={Auth(LandingPage, null)}
                        />
                        <Route
                            exact
                            path="/login"
                            component={Auth(LoginPage, false)}
                        />
                        <Route
                            exact
                            path="/Register"
                            component={Auth(RegisterPage, false)}
                        />
                    </Switch>
                </div>
            </Router>
        </>
    );
}

export default App;
