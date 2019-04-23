import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import LoginPage from './components/loginPage'
import RegisterPage from './components/registerPage'
import {PrivateRoute} from './components/privateRoute'
import User from './components/user'


const ConnectyCube = window.ConnectyCube

const history = createBrowserHistory();

const CREDENTIALS = {
  appId: 629,
  authKey: 'gy9ARS4acJh9DHb',
  authSecret: 'YfQFkHu3h9WtdPw'
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authorization: false,
      session: {}
  };
}
componentWillMount(){
  ConnectyCube.init(CREDENTIALS);
  if(localStorage.getItem('user')){
    let localStorageObj = JSON.parse(localStorage.getItem('user'))
    let userCredentials = {login: localStorageObj.login, password: localStorageObj.password};

    let cont = this
      ConnectyCube.createSession(userCredentials, function(error, session) {
        if(error){
          cont.setState({
            authorization: false
          })
        }else{
          cont.setState({
            authorization: true,
            session: session
          })
        }
      });
  }else{
    ConnectyCube.createSession(function(error, session) {

    });
  }
}
  setAuthorization = () =>{
    this.setState({
      authorization: !this.state.authorization
    })
  }
  setSession = (newSession) =>{
    this.setState({
      session: newSession
    })
  }
  render() {
    return (
      <Router history={history}>

            <PrivateRoute exact path="/" component={User} 
              authorization={this.state.authorization}
              session={this.state.session} 
              resetSession={this.setSession} 
              setAuthorization={this.setAuthorization}/>
            <Route path="/login" render={()=><LoginPage 
              authorization={this.state.authorization} 
              setAuthorization={this.setAuthorization} 
              setSession={this.setSession}/>}  />
            <Route path="/register" render={()=><RegisterPage authorization={this.state.authorization}/>}/>
          
      </Router>
    );
  }
}

export default App;
