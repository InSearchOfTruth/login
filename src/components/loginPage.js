import React from 'react';
import { Link , Redirect } from 'react-router-dom';

const ConnectyCube = window.ConnectyCube

class LoginPage extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          error: false
      };
    }
    setLocalStorage = (user) =>{
      let obj = {login: user.login, password: user.password}
      let strObj = JSON.stringify(obj)
        localStorage.setItem('user', strObj)
        this.props.setAuthorization()
    }
    wrongData = () =>{
      this.login.value = "";
      this.password.value = "";
    }
    loginUser = () =>{
        if(this.login.value && this.password.value){
          let user = {
            login : this.login.value,
            password: this.password.value,
        }
        let cont = this
        ConnectyCube.createSession(user, function(error, session) {
            if(error){
              cont.setState({
                error: true
              })
              cont.wrongData()
            }else{
              cont.setState({
                error: false
              })
              cont.props.setSession(session)
              cont.setLocalStorage(user)
            }
          });
        }else{
          this.setState({
            error: true
          })
          this.wrongData()
        }
    }
    removeLocalStorage = ()=>{
        localStorage.removeItem("user")
        
    }
    render(){
            if(!this.props.authorization){
                return(
                    <div className="sign-up-block">
                      <div className="form">
                        <h1>Login</h1>
                        <div >
                                <div className="sign-up-input"><input type="text" className={this.state.error ? "wrong-data" : ""} placeholder="Login" ref={(input)=>this.login = input}/></div>
                                <div className="sign-up-input">
                                  <input type="password" className={this.state.error ? "wrong-data" : ""} placeholder="Password" ref={(input)=>this.password = input}/>
                                </div>
                                
                                {this.state.error && 
                                <div className="error"> incorrect login or email</div>
                            }
                        </div>
                        <div className="block-link">
                            <Link to="/register" className="btn-link">Registration </Link> <button onClick={this.loginUser}>Login</button>
                        </div>
                      </div>
                    </div>
                )
            }else{
               return(
                    <Redirect to={{ pathname: '/' }}/>
               )
            }
    }
}
export default LoginPage;