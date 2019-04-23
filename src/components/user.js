import React from 'react';
import UserAvatar from './user-avatar'
import UserInfo from './user-info'

const ConnectyCube = window.ConnectyCube

class User extends React.Component{
    removeLocalStorage = ()=>{
        let thisProps = this.props
        ConnectyCube.destroySession(function(error) {
            if(!error){
                localStorage.removeItem("user")
                thisProps.setAuthorization()
                thisProps.resetSession({})
            }
        });
        
    }
    render(){
        return(
            <div className="user-profile">
                <UserAvatar user={this.props.session.user}/>
                <UserInfo 
                id={this.props.session.user.id}
                name={this.props.session.user.full_name}
                phone={this.props.session.user.phone}
                email={this.props.session.user.email}
                />
                <span className="logout" onClick={this.removeLocalStorage}>Logout</span>
            </div>
            
        )
    }
}

export default User;