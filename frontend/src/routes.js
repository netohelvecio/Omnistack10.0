import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ListDev from './pages/ListDev';
import RegisterDev from './pages/RegisterDev';
import EditDev from './pages/EditDev';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={ListDev} />
      <Route path="/register" component={RegisterDev} />
      <Route path="/edit/:_id" component={EditDev} />
    </Switch>
  );
}
