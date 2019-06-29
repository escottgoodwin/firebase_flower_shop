import React from 'react';
import './App.css';

import firebase from 'firebase'

const db = firebase.firestore();
let collection = db.collection('flower')

class AddSale extends React.Component {

  state={
    products:[]
  }

  componentDidMount(){

  // Initial call for products list
  const products = []
  db.collection('products').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      const product = {
        docId:doc.id,
        name:doc.data().name,
        price:doc.data().price,
        productImg:doc.data().productImg,
        uid:doc.data().uid
      }

      products.push(product)
    });
    this.setState({products:products})
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });


  //listener that updates if a product is added
  db.collection("products")
  .onSnapshot(snapshot => {
      let products = [];

      snapshot.forEach(doc => {
        const product = {
          docId:doc.id,
          name:doc.data().name,
          price:doc.data().price,
          productImg:doc.data().productImg,
          uid:doc.data().uid
        }

        products.push(product)
      });

      this.setState({
        products:products
      });
    });

  }

  handleSubmit = (product) => {

    var user = firebase.auth().currentUser;
    const { customer, customerId } = this.props.location.state

    db.collection("sales").add({
      productId:product.uid,
      productName:product.name,
      price:product.price,
      productImg:product.productImg,
      customer:customer,
      customerId:customerId,
      salesmanId:user.uid,
      salesman:user.displayName
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    this.props.history.push(`sales`)
  }

  render(){

    const { products } = this.state
    const { customer } = this.props.location.state
  return (
      <div className="App-main">

        <div  style={{color:'green'}}>
          Add Sale - {customer}
        </div>

        <div>
          <label for="name">Name</label>
        </div>

          <div>
          {products.map(product =>

            <div  style={{margin:20}}>
            <div> <img src={product.productImg} style={{width:100,borderRadius:15}} alt="logo" /> </div>
            <div> {product.name} </div>
            <div> {product.price} </div>
            <div style={{backgroundColor:'green',margin:20,padding:20,borderRadius:15}} onClick={() => this.handleSubmit({productId:product.uid,name:product.name,price:product.price,productImg:product.productImg})}>
              Add Sale
            </div>
            </div>
          )}

        <div style={{backgroundColor:'lightgreen',margin:20,padding:20,borderRadius:15}} onClick={()=>this.props.history.push(`/signedIn`)} >
          Home
        </div>

      </div>
      </div>

    );
  }
}

export default AddSale;
