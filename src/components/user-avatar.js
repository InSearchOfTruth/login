import React from 'react';
import noAvatar from '../image/no-avatar.png'
import plus from '../image/plus.png'

const ConnectyCube = window.ConnectyCube

class UserAvatar extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          avatar: noAvatar
      };
    }
    inputImage = () =>{
        document.getElementById('image-input').click()
    }
    setNewAvatar = (link) =>{
        
            let avatarUID,avatarURL;
                avatarUID = JSON.parse(link.custom_data)['avatar_uid']
                avatarURL = ConnectyCube.storage.privateUrl(avatarUID);
            this.setState({
                avatar : avatarURL
            })
    }
    componentWillMount(){
        if(this.props.user.custom_data){
            this.setNewAvatar(this.props.user)
        }
    }
    uploadImage = () =>{
        
        let inputFile = this.avatarImg.files[0]
        var fileParams = {name: inputFile.name, file: inputFile, type: inputFile.type, size: inputFile.size, 'public': false};
        let userAvatar = this
            ConnectyCube.storage.createAndUpload(fileParams, function(error, result) {
            if (!error) {
                var updatedUserProfile = {
                'custom_data': JSON.stringify({'avatar_uid': result.uid})
                };
                
                ConnectyCube.users.update(updatedUserProfile, function(error, user){
                    userAvatar.setNewAvatar(updatedUserProfile)
                });
            }
            });
    }
    render(){
       
        
       
        return(
                <div className="user-avatar" onClick={this.inputImage}>
                    <img src={this.state.avatar} alt="avatar"/>
                    <div className="add-new-avatar"><img src={plus}/></div>
                    <input type="file" id="image-input" className="get-file" onChange={this.uploadImage} ref={(input)=>this.avatarImg = input}/>
                </div>
        )
    }
}

export default UserAvatar;