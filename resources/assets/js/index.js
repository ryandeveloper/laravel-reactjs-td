import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './components/App';
import TaskEdit from './components/TaskEdit';

ReactDOM.render(
   <BrowserRouter>
      <div>
         <Switch>
            <Route exact path='/:id/edit' component={TaskEdit} />
            <App />
         </Switch>
      </div>
   </BrowserRouter>,
   document.getElementById('root')
);
