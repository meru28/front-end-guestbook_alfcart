import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from '../components/Home';
import Header from '../components/Header';
import FormTamu from '../components/FormTamu';
import DaftarTamu from '../components/DaftarTamu';

class App extends Component {
  render() {
    return (
      <div>
          <Header navBrand={"Buku Tamu"}/>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/daftartamu" component={DaftarTamu}/> 
        </div>
      </div>
    );
  }
}

export default App;
