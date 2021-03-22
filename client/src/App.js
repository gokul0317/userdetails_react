import React from 'react';
import  UserDetail from  './features/userDetail/UserDetail'
import SingleView from './features/userDetail/SingleView'
import './App.css';
import { Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <main>
        <Switch>
            <Route path="/" component={UserDetail} exact />
           <Route path="/userdetail/:id" component={SingleView} exact />
        </Switch>
      </main>
  );
}
// <Route path="/shop" component={Shop} />

export default App;
