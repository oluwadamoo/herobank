import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'



import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register"
import History from "./pages/history/History";
import Balance from "./pages/balance/Balance";
import Withdraw from "./pages/withdraw/Withdraw";
import Deposit from "./pages/deposit/Deposit";
import Transfer from "./pages/transfer/Transfer";
import Admin from "./pages/admin/Admin";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import { AuthContext } from './context/AuthContext'

import "./app.scss"



function Routes() {
  const { user } = useContext(AuthContext)
  return (
    <Switch>
      <Route exact path="/">
        {!user ? <Redirect to="/login" /> : <Home />}
      </Route>
      <Route path="/admin">
        {!user ? <Redirect to="/login" /> : <Admin />}

      </Route>

      <Route path="/history/:userId">
        {!user ? <Redirect to="/login" /> : <History />}
      </Route>

      <Route path="/balance/:userId">
        {!user ? <Redirect to="/login" /> : <Balance />}
      </Route>
      <Route path="/transfer/:userId">
        {!user ? <Redirect to="/login" /> : <Transfer />}

      </Route>
      <Route path="/deposit/:userId">
        {!user ? <Redirect to="/login" /> : <Deposit />}


      </Route>
      <Route path="/withdraw/:userId">
        {!user ? <Redirect to="/login" /> : <Withdraw />}

      </Route>
      <Route path="/login">
        {user ? <Redirect to="/" /> : <Login />}

      </Route>
      <Route path="/signup">
        <Register />
      </Route>
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  )
}

const App = () => {
  return (
    <div className="app">
      <Router>

        <Routes />

      </Router>

    </div>


  );
};

export default App;
