import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom'

import firebase from 'firebase'

const db = firebase.firestore();

class CustomerList extends React.Component {

  state={
    customers:[]
  }

  deleteCustomer = uid => {
    db.collection("customers").doc(uid).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
    console.log(uid)
  }

  componentDidMount(){

  // Initial call for flowers list
  const customers = []
  db.collection('customers').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      const customer = {docId:doc.id,
      name:doc.data().name,
      uid:doc.data().uid
      }

      customers.push(customer)
    });
    this.setState({customers:customers})
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });


  //listener that updates if a flower is added
  db.collection("customers")
  .onSnapshot(snapshot => {
      let customers = [];

      snapshot.forEach(doc => {
        const customer = {docId:doc.id,
        name:doc.data().name,
        uid:doc.data().uid
        }

        customers.push(customer)
      });

      this.setState({
        customers:customers
      });
    });

  }

  render(){

      const { customers } = this.state

  return (
        <>
        <div className="App-main">
        <div>Customers</div>

        <div style={{backgroundColor:'lightgreen',margin:20,padding:20,borderRadius:15}}
        onClick={()=>this.props.history.push(`/add_customer`)} >
          Add Customer
        </div>

        <div>
        {customers.map(item =>

          <div  style={{margin:20}}>
          <div> {item.name} </div>

          <div style={{backgroundColor:'lightgreen',margin:20,padding:20,borderRadius:15}}
          onClick={()=>this.props.history.push({
            pathname: "/add_sale",
            state:
              { customer: item.name,
                customerId: item.uid }
            })} >
            Add Sale
          </div>

          <div onClick={() => this.deleteCustomer(item.docId)} style={{backgroundColor:'red',color:'white'}}>
          Delete
          </div>
          </div>

        )}

        </div>

        <div style={{backgroundColor:'lightgreen',margin:20,padding:20,borderRadius:15}}
        onClick={()=>this.props.history.push(`/signedIn`)} >
          Home
        </div>

          </div>
        </>
  );
}
}

export default withRouter(CustomerList)
