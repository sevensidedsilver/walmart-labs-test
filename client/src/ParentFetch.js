import React, { Component } from 'react';
const products = require('./productList.js')



class ParentFetch extends Component {
  constructor(){
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount(){
    fetch('http://localhost:8080/http://api.walmartlabs.com/v1/items?ids=' + products.join(",") + '&apiKey=kjybrqfdgp3u4yv2qzcnjndj')
    .then(response => response.json())
    .then(data => this.setState({products: data.items}))

}
  render(){
    return(
      <input type="text" className="search-field" onChange={this.handleSearch}/>


    )
  }


}

export default ParentFetch;
