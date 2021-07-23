import './App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Header from './components/Header/Header'
//import Footer from './components/Footer/Footer'
import ListViewScreen from './screens/listView/ListViewScreen'
import MapViewScreen from './screens/mapView/MapViewScreen'
import HomeScreen from './screens/HomeScreen/HomeScreen';
import SingleProgramScreen from './screens/SingleProgramScreen/SingleProgramScreen';

const App = ()=> {
  return (
    <Router>
      <Header/>
        <Switch>
          <Route path="/programs/listview" component={ListViewScreen}/>
          <Route path="/programs/mapview" component={MapViewScreen}/>
          <Route path="/programs/:programId" component={SingleProgramScreen}/>
          <Route exact path="/" component={HomeScreen}/>

        </Switch>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
