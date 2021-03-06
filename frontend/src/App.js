import './App.css'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Header from './components/Header/Header'
import InformationBar from './components/InformationBar/InformationBar';
import FilterBar from './components/FilterBar/FilterBar';
import Footer from './components/Footer/Footer'
import ListViewScreen from './screens/listView/ListViewScreen'
import MapViewScreen from './screens/mapView/MapViewScreen'
import HomeScreen from './screens/HomeScreen/HomeScreen';
import SingleProgramScreen from './screens/SingleProgramScreen/SingleProgramScreen';
import SingleLocationScreen from './screens/SingleLocationScreen/SingleLocationScreen';
import MapListScreen from './screens/MapListScreen/MapListScreen';

const App = ()=> {
  return (
    <Router>
      <div className="content">
        <Header/>
        <InformationBar/>
        <FilterBar/>
          <Switch>
            <Route path="/programs/maplist" component={MapListScreen}/>
            <Route path="/programs/listview" component={ListViewScreen}/>
            <Route path="/programs/mapview" component={MapViewScreen}/>
            <Route path="/programs/:programId" component={SingleProgramScreen}/>
            <Route path="/locations/:locationId" component={SingleLocationScreen}/>
            <Route exact path="/" component={HomeScreen}/>

          </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
