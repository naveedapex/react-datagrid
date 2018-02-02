import React, { Component } from 'react';

import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DataGrid from './components/app';
import DetailPage from './components/detail';

class App extends Component {

  
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={DataGrid}/>
          <Route path="/:companyId" component={DetailPage}/>
         
        </div>
      </Router>
    );
  }
}

export default App;
