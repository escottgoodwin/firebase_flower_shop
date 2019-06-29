import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'

const db = firebase.firestore();

class SignOut extends React.Component {

  state={
    name:'',
    userImg:'',
  }

 notSignedIn = () => {
      this.props.history.push(`/`)
  }

  signOut = (props) => {
    firebase.auth().signOut().then(function() {

      console.log('signed out')


    }).catch(function(error) {
      console.log(error)
    });
    this.props.history.push(`/`)
  }

  render(){


  return (

        <div style={{backgroundColor:'lightgreen',margin:20,padding:20,borderRadius:15}} onClick={()=>this.signOut(this.props)} >
          Sign Out
        </div>



  );
}
}

export default withRouter(SignOut)
