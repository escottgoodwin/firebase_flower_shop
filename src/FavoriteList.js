import React from 'react';
import './App.css';

import firebase from 'firebase'

const db = firebase.firestore();
let collection = db.collection('flower')

class FavoriteList extends React.Component {

  state={
    name:'',
    userImg:'',
    flowers:[]
  }

 notSignedIn = () => {
      this.props.history.push(`/`)
  }

  componentDidMount(){

  firebase.auth().onAuthStateChanged(user =>  {
    if (user) {
        this.setState({
          name:user.displayName,
          userImg:user.photoURL})
    } else {
      this.setState({name:'No user'})
      this.notSignedIn()
    }
  });

  // Initial call for flowers list
  const flowers = []
  db.collection('flowers').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      flowers.push(doc.data())
    });
    this.setState({flowers:flowers})
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });


  //listener that updates if a flower is added
  db.collection("flowers")
  .onSnapshot(snapshot => {
      let flowers = [];

      snapshot.forEach(doc =>
        flowers.push(doc.data()),
      );

      this.setState({
        flowers:flowers
      });
    });


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

      const { name, userImg, flowers } = this.state

  return (
      <div className="App-main">

        <div>
          <img src={userImg} style={{width:50,borderRadius:15}} alt="logo" />
          </div>

          <div>
        Welcome  {this.state.name}
        </div>

        <div style={{backgroundColor:'lightgreen',margin:20,padding:20,borderRadius:15}} onClick={()=>this.props.history.push(`/add_fav`)} >
          Add Flower
        </div>

        <div style={{margin:20,color:'green'}}>
          All Favorite Flowers
        </div>

        <div>
        {this.state.flowers.map(flower =>
          
          <div key={flower.flowerImg} style={{margin:20}}>
          <div> <img src={flower.flowerImg} style={{width:100,borderRadius:15}} alt="logo" /> </div>
          <div>{flower.flower}</div>
          <div> {flower.name} </div>
          </div>

        )}

        </div>

        <div style={{backgroundColor:'lightgreen',margin:20,padding:20,borderRadius:15}} onClick={()=>this.signOut(this.props)} >
          Sign Out
        </div>


      </div>
  );
}
}

export default FavoriteList;
