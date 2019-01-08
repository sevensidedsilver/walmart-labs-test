import React, { Component } from 'react';
import SearchInput, {createFilter} from 'react-search-input';

import logoIcon from "./logo-icon.png";
const products = require('./productList.js')

const KEYS_TO_FILTERS = ['name', 'details']


class ParentFetch extends Component {
  constructor(){
    super();
    this.state = {
      products: [],
      searchterm: ''
    };
    this.searchUpdated = this.searchUpdated.bind(this)
  }

  componentDidMount(){
    fetch('http://localhost:8080/http://api.walmartlabs.com/v1/items?ids=' + products.join(",") + '&apiKey=kjybrqfdgp3u4yv2qzcnjndj')
    .then(response => response.json())
    .then(data => {
      let initialState = []
      data.items.forEach(item => {
        initialState.push({
          key: item.itemId,
          name: item.name,
          price: item.msrp,
          details: item.shortDescription,
          image: item.mediumImage
        })
      })
      this.setState(
        {
          products: initialState,
          searchTerm: ''
        }
      )

    })

}



  render(){
    const filteredProducts = this.state.products.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    return (
      <div className="app">
        <div className="titleContain">
          <img alt="logo" src={logoIcon}/>
          <h1 className="title">Pre-Employment API Search</h1>
        </div>
        <div className="searchContain">
          <SearchInput className='search-input' onChange={this.searchUpdated} />
          {filteredProducts.map(product => {
            return (
              <div className="product" key={product.key}>
                <div className="productImage">
                  <img alt={product.name} src={product.image}/>
                </div>
                <div className="productInfo">
                  <div className="productHead">
                    <h2>{product.name}</h2>
                    <p>${product.price}</p>
                  </div>
                  <p className="details">{product.details}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  searchUpdated (term) {
  this.setState({searchTerm: term})
  }

}

export default ParentFetch;
