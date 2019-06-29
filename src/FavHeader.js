import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom'

class FavHeader extends React.Component {

  render(){

      const { name, userImg } = this.props

  return (
        <>
        <div>
          <img src={userImg} style={{width:50,borderRadius:15}} alt="logo" />
          </div>

          <div>
        Welcome  {name}
        </div>

        <div style={{backgroundColor:'lightgreen',margin:20,padding:20,borderRadius:15}}
        onClick={()=>this.props.history.push(`/products`)} >
          Products
        </div>

        <div style={{backgroundColor:'lightgreen',margin:20,padding:20,borderRadius:15}}
        onClick={()=>this.props.history.push(`/customers`)} >
          Customers
        </div>

        <div style={{backgroundColor:'lightgreen',margin:20,padding:20,borderRadius:15}}
        onClick={()=>this.props.history.push(`/sales`)} >
          Sales
        </div>

        </>
  );
}
}

export default withRouter(FavHeader)
