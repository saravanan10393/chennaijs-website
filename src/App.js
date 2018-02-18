import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { UserPage } from './user.page';
import { AdminPage } from './admin.page';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route exact={true} path="/admin" render={() => <UserPage />}/>
          <Route  path="/" render={() => <AdminPage />} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}



export default App;