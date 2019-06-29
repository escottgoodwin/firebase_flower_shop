import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom'

import firebase from 'firebase'

const db = firebase.firestore();


class SaleList extends React.Component {

  state={
    sales:[]
  }

  deleteSale = uid => {
    db.collection("sales").doc(uid).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
    console.log(uid)
  }

  componentDidMount(){

  // Initial call for sales list
  const sales = []
  db.collection('sales').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {

      const sale = {
        docId:doc.id,
        productName:doc.data().productName,
        productId:doc.data().productId,
        price:doc.data().price,
        saleImg:doc.data().saleImg,
        customer:doc.data().customer,
        customerId:doc.data().customerId,
        salesmanId:doc.data().salesmanId,
        salesman:doc.data().salesman,
        uid:doc.data().uid
      }

      sales.push(sale)
    });
    this.setState({sales:sales})
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });


  //listener that updates if a sale is added
  db.collection("sales")
  .onSnapshot(snapshot => {
      let sales = [];

      snapshot.forEach(doc => {

        const sale = {
          docId:doc.id,
          productName:doc.data().productName,
          productId:doc.data().productId,
          price:doc.data().price,
          saleImg:doc.data().saleImg,
          customer:doc.data().customer,
          customerId:doc.data().customerId,
          salesmanId:doc.data().salesmanId,
          salesman:doc.data().salesman,
          uid:doc.data().uid
        }

        sales.push(sale)
      });

      this.setState({
        sales:sales
      });
    });

  }

  render(){

      const { sales } = this.state

  return (
        <>
        <div className="App-main">
        <div>Sales</div>

        <div>
        {sales.map(sale =>

          <div  style={{margin:20}}>
          <div> <img src={sale.saleImg} style={{width:100,borderRadius:15}} alt="logo" /> </div>
          <div>{sale.productName}</div>
          <div> {sale.price} </div>
          <div>{sale.customer}</div>
          <div> {sale.price} </div>
          <div> {sale.salesman} </div>
          <div onClick={() => this.deleteSale(sale.docId)} style={{backgroundColor:'red',color:'white'}}>
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

export default withRouter(SaleList)
