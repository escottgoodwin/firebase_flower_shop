import React from 'react';
import './App.css';

import firebase from 'firebase'

const db = firebase.firestore();
let collection = db.collection('flower')

class AddCustomer extends React.Component {

  state={
    name:'',
    price:''
  }

  handleSubmit = () => {

    const { name, price, productImg } = this.state

    db.collection("products").add({
      name: name,
      price: price,
      productImg: productImg
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    this.props.history.push(`products`)
  }

  render(){

      const { name, price, productImg } = this.state

  return (
      <div className="App-main">

        <div  style={{color:'green'}}>
          Add Product
        </div>

        <div>
          <label for="name">Name</label>
          </div>
          <div>

          <input id="name" type="text" value={name} onChange={e => this.setState({ name: e.target.value })} />
        </div>

        <div>
          <label for="price">Price</label>
          </div>
          <div>

          <input id="price" type="text" value={price} onChange={e => this.setState({ price: e.target.value })} />
        </div>

        <div>
          <label for="image">Image</label>
          </div>
          <div>

          <input id="image" type="text" value={productImg} onChange={e => this.setState({ productImg: e.target.value })} />
        </div>

        <div style={{backgroundColor:'green',margin:20,padding:20,borderRadius:15}} onClick={this.handleSubmit}>
          Add Product
        </div>

        <div style={{backgroundColor:'lightgreen',margin:20,padding:20,borderRadius:15}} onClick={()=>this.props.history.push(`/signedIn`)} >
          Home
        </div>



      </div>
  );
}
}

export default AddCustomer;
