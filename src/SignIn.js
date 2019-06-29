import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase'
import auth from 'firebase'
import './App.css';

var firebaseConfig = {
  apiKey: "AIzaSyDBG7YEJCpIt9XMcTEuhekQT05FJUYj4B4",
  authDomain: "quandrio-ee823.firebaseapp.com",
  databaseURL: "https://quandrio-ee823.firebaseio.com",
  projectId: "quandrio-ee823",
  storageBucket: "quandrio-ee823.appspot.com",
  messagingSenderId: "522593060688",
  appId: "1:522593060688:web:95ad8e30f7952e54"
};

firebase.initializeApp(firebaseConfig);

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

const SignIn = () => {
  return (
      <div className="App-main">
        <p>
          Login
        </p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
  );
}

export default SignIn;
