import React,{Component} from 'react';
import flower_2 from './flower_2.png'
import SignIn from './SignIn'
import Header from './Header'
import FavoriteList from './FavoriteList'
import AddFav from './AddFav'
import MainFav from './MainFav'
import AddCustomer from './AddCustomer'
import AddProduct from './AddProduct'
import AddSale from './AddSale'
import CustomerList from './CustomerList'
import ProductList from './ProductList'
import SaleList from './SaleList'
import { Route, Switch} from 'react-router-dom'

import './App.css';

import firebase from 'firebase'

const siteName = `Joe's Flower Mart`

class App extends Component {

    state = {
      name:'',
      userImg:'',
      uid:''

    }

  componentDidMount(){

    firebase.auth().onAuthStateChanged(user =>  {
      if (user) {
          this.setState({
            name:user.displayName,
            userImg:user.photoURL,
            uid:user.uid})
      } else {
        this.setState({name:'No user'})
        this.notSignedIn()
      }
    });

    }

render(){
  return (
    <div className="App">

      <Header siteName={siteName}/>

      <Switch>
        <Route exact path="/" component={SignIn}/>
        <Route exact path="/signedIn" component={MainFav}/>
        <Route exact path="/add_fav"  component={AddFav}/>
        <Route exact path="/add_customer"  component={AddCustomer}/>
        <Route exact path="/add_product" component={AddProduct}/>
        <Route exact path="/add_sale"  component={AddSale}/>

        <Route exact path="/customers" component={CustomerList}/>
        <Route exact path="/products" component={ProductList}/>
        <Route exact path="/sales" component={SaleList}/>

      </Switch>

    </div>
  );
}
}

export default App;
