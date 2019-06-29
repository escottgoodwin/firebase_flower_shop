import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom'

import firebase from 'firebase'

const db = firebase.firestore();


class ProductList extends React.Component {

  state={
    products:[]
  }

 notSignedIn = () => {
      this.props.history.push(`/`)
  }

  deleteProduct = uid => {
    db.collection("products").doc(uid).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
    console.log(uid)
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




  render(){

      const { products } = this.state

  return (
        <>
        <div className="App-main">
        <div>Product</div>

        <div style={{backgroundColor:'lightgreen',margin:20,padding:20,borderRadius:15}}
        onClick={()=>this.props.history.push(`/add_product`)} >
          Add Product
        </div>

        <div>
        {products.map(product =>

          <div  style={{margin:20}}>
          <div> <img src={product.productImg} style={{width:100,borderRadius:15}} alt="logo" /> </div>
          <div> {product.name} </div>
          <div> {product.price} </div>
          <div onClick={() => this.deleteProduct(product.docId)} style={{backgroundColor:'red',color:'white'}}>
          Delete
          </div>
          </div>

        )}

        </div>
        <div style={{backgroundColor:'lightgreen',margin:20,padding:20,borderRadius:15}} onClick={()=>this.props.history.push(`/signedIn`)} >
          Home
        </div>
        </div>
        </>
  );
}
}

export default withRouter(ProductList)
