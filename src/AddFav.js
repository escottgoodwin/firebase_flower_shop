import React from 'react';
import './App.css';

import firebase from 'firebase'

const db = firebase.firestore();
let collection = db.collection('flower')

class AddFav extends React.Component {

  state={
    flower:'',
    flowerImg:''
  }
  componentDidMount(){



  }

  handleSubmit = () => {
    const { flower, flowerImg } = this.state
    var user = firebase.auth().currentUser;
    console.log(user)

    db.collection("flowers").add({
    flower: flower,
    flowerImg: flowerImg,
    name: user.displayName,
    uid:user.uid
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);

    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    this.props.history.push(`signedIn`)
  }

  render(){

      const { flower, flowerImg } = this.state
      const { name } = this.props

  return (
      <div className="App-main">
      <div>{ name } </div>
        <div  style={{color:'green'}}>
          Add Favorites
        </div>

        <div>
          <label for="name">Name</label>
          </div>
          <div>

          <input id="name" type="text" value={flower} onChange={e => this.setState({ flower: e.target.value })} />
        </div>
        <div>
        <label for="image">Image Link</label>
        </div>
        <div>
          <input type="image" type="text" value={flowerImg} onChange={e => this.setState({ flowerImg: e.target.value })} />
        </div>

        <div style={{backgroundColor:'green',margin:20,padding:20,borderRadius:15}} onClick={this.handleSubmit}>
          Add Flower
        </div>

        <div style={{backgroundColor:'lightgreen',margin:20,padding:20,borderRadius:15}} onClick={()=>this.props.history.push(`/signedIn`)} >
          Home
        </div>



      </div>
  );
}
}

export default AddFav;
