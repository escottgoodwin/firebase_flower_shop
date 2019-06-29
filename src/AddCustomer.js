import React from 'react';
import './App.css';

import firebase from 'firebase'

const db = firebase.firestore();
let collection = db.collection('flower')

class AddCustomer extends React.Component {

  state={
    name:''
  }

  handleSubmit = () => {

    const { name } = this.state

    db.collection("customers").add({
    name: name
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    this.props.history.push(`customers`)
  }

  render(){

      const { name } = this.state

  return (
      <div className="App-main">

        <div  style={{color:'green'}}>
          Add Customer
        </div>

        <div>
          <label for="name">Name</label>
          </div>
          <div>

          <input id="name" type="text" value={name} onChange={e => this.setState({ name: e.target.value })} />
        </div>

        <div style={{backgroundColor:'green',margin:20,padding:20,borderRadius:15}} onClick={this.handleSubmit}>
          Add Customer
        </div>

        <div style={{backgroundColor:'lightgreen',margin:20,padding:20,borderRadius:15}} onClick={()=>this.props.history.push(`/signedIn`)} >
          Home
        </div>



      </div>
  );
}
}

export default AddCustomer;
