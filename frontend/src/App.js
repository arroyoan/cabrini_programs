import './App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ListViewScreen from './screens/listView/ListViewScreen'
import HomeScreen from './screens/HomeScreen/HomeScreen';

const App = ()=> {
  return (
    <Router>
      <Header/>
        <Switch>
          <Route path="/programs/listview" component={ListViewScreen}/>
          <Route path="/programs/mapview" component={ListViewScreen}/>
          <Route exact path="/" component={HomeScreen}/>

        </Switch>
      <Footer/>
    </Router>
  );
}

export default App;