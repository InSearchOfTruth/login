import React from 'react';
import { Link , Redirect } from 'react-router-dom';

const ConnectyCube = window.ConnectyCube

class RegisterPage extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          registered: false,
          error: false
      };
    }
    wrongData = () =>{
        this.login.value = ""
        this.password.value = ""
        this.email.value = ""
        this.name.value = ""
        this.phone.value = ""
    }
    registerNewUser = () =>{
        let user = {
            login : this.login.value,
            password: this.password.value,
            email: this.email.value,
            full_name: this.name.value,
            phone: this.phone.value
        }
        let cont = this
        ConnectyCube.users.signup(user, function(error, user){
            if(error){
              cont.setState({
                  error: true,
                  registered: false
              })
              cont.wrongData()
            }else{
                cont.setState({
                    error: false,
                    registered: true
              })
            }
        })
    }
    render(){
        if(!this.props.authorization){
            return(
                <div className="sign-up-block">
                    <div className="form">
                        <h1>Registration</h1>
                        <div className="sign-up-input">
                            <input type="text" className={this.state.error ? "wrong-data" : ""} placeholder="Login" ref={(input)=>this.login = input}/>
                            </div>
                            
                        <div className="sign-up-input">
                            <input type="password" className={this.state.error ? "wrong-data" : ""} placeholder="Password" ref={(input)=>this.password = input}/>
                            </div>
                        <div className="sign-up-input">
                            <input type="text" className={this.state.error ? "wrong-data" : ""} placeholder="E-mail" ref={(input)=>this.email = input}/>
                            </div>    
                        <div className="sign-up-input">
                            <input type="text" className={this.state.error ? "wrong-data" : ""} placeholder="Name" ref={(input)=>this.name = input}/>
                            </div>
                        <div className="sign-up-input">
                            <input type="text" className={this.state.error ? "wrong-data" : ""} placeholder="Phone" ref={(input)=>this.phone = input}/>
                            </div> 
                            {this.state.error && 
                                <div className="error"> incorrect data</div>
                            }
                            {this.state.registered && 
                                <div className="successful"> Successful registration</div>
                            }      
                        <div className="block-link"><Link to="/login" className="btn-link">Login</Link> <button onClick={this.registerNewUser}>Registration</button></div>
                        
                       
                            
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
export default RegisterPage;