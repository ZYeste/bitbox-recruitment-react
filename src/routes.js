import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App';
import Products from './pages/Products';

const AppRoutes = () =>
<App>
    <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/products" component={Products} />
    </Switch>
</App>;

export default AppRoutes;