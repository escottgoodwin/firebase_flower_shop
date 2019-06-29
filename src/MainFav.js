import React from 'react';
import './App.css';
import firebase from 'firebase'

import FavHeader from './FavHeader'
import FavList from './FavList'
import SignOut from './SignOut'

class MainFav extends React.Component {

  state = {
    name:'',
    userImg:'',
    uid:''

  }

  componentDidMount(){

    firebase.auth().onAuthStateChanged(user =>  {
      if (user) {
          this.setState({
            name:user.displayName,
            userImg:user.photoURL,
            uid:user.uid})
      } else {
        this.setState({name:'No user'})
        this.notSignedIn()
      }
    });

    }


  notSignedIn = () => {
       this.props.history.push(`/`)
   }

  render(){

      const { name, userImg } = this.state

  return (
      <div className="App-main">

      <FavHeader name={name} userImg={userImg} />

      <SignOut />

      </div>
  );
}
}

export default MainFav;
