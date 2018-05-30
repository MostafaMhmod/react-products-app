import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom'
import './home.css';
import axios from 'axios';
import file from "../products.json"

const db1 = JSON.stringify(file);
let db = JSON.parse(db1);

class home extends Component {
  constructor(props) {
    super();
    this.state = {
      db: [{}],
      categories: [],
      brands: []
    }

    this.handleBrandSelect = this.handleBrandSelect.bind(this);
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    // axios.get(`http://localhost:8080/viewStores`)
    // .then(res => {
    //  db = res.data;
    this.state.db = db;

    // })
    let tmp1 = this.state.categories
    for (let i = 0; i < db.length; i++) {
      if (!(tmp1.includes(this.state.db[i].category.name))) {
        tmp1.push(this.state.db[i].category.name)
      }
    }

    let tmp2 = this.state.brands
    for (let i = 0; i < db.length; i++) {
      if (!(tmp2.includes(this.state.db[i].brand))) {
        tmp2.push(this.state.db[i].brand)
      }
    }
    this.setState({ categories: tmp1, brands: tmp2 });

  }
  handleBrandSelect(item, e) {
    let tmp = []
    for (let i = 0; i < db.length; i++) {
      if (db[i].brand.toLowerCase() === item.toLowerCase()) {
        tmp.push(db[i]);
      }
    }
    this.setState({ db: tmp });
  }

  handleCategorySelect(item, e) {
    let tmp = []
    for (let i = 0; i < db.length; i++) {
      if (db[i].category.name.toLowerCase() === item.toLowerCase()) {
        tmp.push(db[i]);
      }
    }
    this.setState({ db: tmp });

  }

  handleSearch(value) {
    let newDB = db.filter((val) => {
      return ((val.name.toLowerCase()).includes(value.toLowerCase()) || (val.brand.toLowerCase()).includes(value.toLowerCase()) 
              || (val.category.name.toLowerCase()).includes(value.toLowerCase()))
    })
    this.setState({ db: newDB });

  }

  render() {

    let products = this.state.db.map((item, i) => {
      return (
        <div key={i} className="prod_box">
          <div className="top_prod_box"></div>
          <div className="center_prod_box">
            <div className="product_title">
              {item.name}
              <a href=""></a>
            </div>
            <div className="product_img">
              <a href="">
                <img src={item.image} alt="" border="0" />
              </a>
            </div>
            <div className="prod_price">
              <span className="price">{item.price + " $"}</span>
            </div>
          </div>
        </div>
      )
    });

    let categories = this.state.categories.map((item, i) => {
      return (
        <li key={i} className="even">
          <a onClick={(e) => this.handleCategorySelect(item, e)}>{item}</a>
        </li>
      )
    })

    let brands = this.state.brands.map((item, i) => {
      return (
        <li key={i} className="odd">
          <a onClick={(e) => this.handleBrandSelect(item, e)}>{item}</a>
        </li>
      )
    })


    return (
      <div id="main_container">
        <div className="top_bar">
          <input onChange={(event) => this.handleSearch(event.target.value)} type="text" className="search_input" placeholder="Search ..." name="search" />
        </div>

        <div id="main_content">
          <div className="left_content">
            <div className="title_box">Categories And Brands</div>
            <ul className="left_menu">
              {categories}
              {brands}
            </ul>
          </div>

          <div className="center_content">
            <div className="center_title_bar">Products</div>
            {products}

          </div>
        </div>
      </div>
    );
  }
}

export default home;