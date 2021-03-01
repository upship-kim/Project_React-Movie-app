import React from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route
  } from "react-router-dom"; 

import LandingPage from '../src/components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <Router> 
      <div>

        <hr/>
        
        <Switch>
          {/* JSX의 주석 방법 */}
          {/* exact 가 붙어있으면 경로가 완벽하게 맞아 떨어질때만 불러올 수 있음.  */}
          
          {/* Route 연결 방법1. Route태그 내 component 연결   => 더 깔끔함 */}
          <Route exact path="/" component={LandingPage}/>
          
           {/* Route 연결 방법2. Route태그 외 따로 import 페이지 연결 */}
          <Route exact path="/login">
            <LoginPage/>
          </Route>

          <Route exact path="/Register" component={RegisterPage} /> 

        </Switch>

      </div>
    </Router>
  );
}

export default App;
