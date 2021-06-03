import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import LandingPage from '../src/components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import MovieDetail from './components/views/MovieDetail/MovieDetail';
import NavBar from './components/views/NavBar/NavBar';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
function App() {
    return (
        <>
            <Router>
                <NavBar />
                <div
                    style={{
                        marginTop: '1rem',
                        position: 'absolute',
                        width: '100%',
                    }}
                >
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
                        <Route
                            exact
                            path="/movie/:movieId"
                            component={Auth(MovieDetail, null)}
                        />
                    </Switch>
                </div>
            </Router>
        </>
    );
}

export default App;
