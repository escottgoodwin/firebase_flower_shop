import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom'

import firebase from 'firebase'

const db = firebase.firestore();


class FavList extends React.Component {

  state={
    flowers:[]
  }

 notSignedIn = () => {
      this.props.history.push(`/`)
  }

  deleteFlower = uid => {
    db.collection("flowers").doc(uid).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
    console.log(uid)
  }

  componentDidMount(){

  // Initial call for flowers list
  const flowers = []
  db.collection('flowers').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      const flower = {docId:doc.id,
      name:doc.data().name,
      flowerImg:doc.data().flowerImg,
      uid:doc.data().uid
      }
      flowers.push(flower)
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

      snapshot.forEach(doc => {
        const flower = {docId:doc.id,
        name:doc.data().name,
        flowerImg:doc.data().flowerImg,
        uid:doc.data().uid
        }
        flowers.push(flower)
      });

      this.setState({
        flowers:flowers
      });
    });

  }




  render(){

      const { flowers } = this.state

  return (

        <div>
        {this.state.flowers.map(flower =>

          <div  style={{margin:20}}>
          <div> <img src={flower.flowerImg} style={{width:100,borderRadius:15}} alt="logo" /> </div>
          <div>{flower.flower}</div>
          <div> {flower.name} </div>
          <div onClick={() => this.deleteFlower(flower.docId)} style={{backgroundColor:'red',color:'white'}}>
          Delete
          </div>
          </div>

        )}

        </div>

  );
}
}

export default withRouter(FavList)
