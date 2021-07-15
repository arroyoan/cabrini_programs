import './App.css';
import React from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const App = ()=> {
  return (
    <Router>
      <Header/>
      
      <Footer/>
    </Router>
  );
}

export default App;
