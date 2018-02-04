import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
// import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'; // create own browser history

import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
// import Header from '../components/Header';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// export history to use it in other files
export const history = createHistory();


const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

// const AppRouter = () => (
//   <Router history={history}>
//     <div>
//       <Header />
//       <Switch>
//         <Route path="/" component={LoginPage} exact={true} />
//         <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
//         <PrivateRoute path="/create" component={AddExpensePage} />
//         <PrivateRoute path="/edit/:id" component={EditExpensePage} />
//         <Route path="/help" component={HelpPage} />
//         <Route component={NotFoundPage} />
//       </Switch>
//     </div>
//   </Router>
// );

// BrowserRouter is not used anymore because we manually handle history 
// outside of react components: see app.js
// const AppRouter = () => (
//   <BrowserRouter>
//     <div>
//       <Header />
//       <Switch>
//         <Route path="/" component={LoginPage} exact={true} />
//         <Route path="/dashboard" component={ExpenseDashboardPage} />
//         <Route path="/create" component={AddExpensePage} />
//         <Route path="/edit/:id" component={EditExpensePage} />
//         <Route path="/help" component={HelpPage} />
//         <Route component={NotFoundPage} />
//       </Switch>
//     </div>
//   </BrowserRouter>
// );

export default AppRouter;
