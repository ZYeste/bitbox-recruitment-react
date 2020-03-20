import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import { Login } from './pages/Login';
import { Products } from './pages/Products';
import { Product } from './pages/Product';
import { ProductAdd } from './pages/ProductAdd';

class App extends Component{

  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/add" component={ProductAdd} />
          <Route exact path="/products/:id" component={Product} />
        </Switch>
      </div>
    );
  }
}

export default App;
