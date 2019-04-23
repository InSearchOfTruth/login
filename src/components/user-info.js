import React from 'react';


class UserInfo extends React.Component{
    render(){
        return(
            <div className="user-info">
                <div className="user-id"><p>id: <span>{this.props.id}</span></p></div>
                <div className="user-name"><p>{this.props.name}</p></div>
                <div className="user-contacts">
                    <p>phone: <span>{this.props.phone}</span></p>
                    <p>email: <span>{this.props.email}</span></p>
                </div>
            </div>
        )
    }
}

export default UserInfo;