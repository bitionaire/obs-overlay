import React from 'react';
import ReactDOM from 'react-dom';
import WaitingScene from "./routes/WaitingScene";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AdminPage from "./routes/AdminPage";
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Switch>
              <Route path="/admin">
                  <AdminPage />
              </Route>
              <Route path="/start">
                  <WaitingScene label="about to start" />
              </Route>
              <Route path="/pause">
                  <WaitingScene label="taking a short break" />
              </Route>
              <Route path="/">
                  <ul>
                      <li><Link to="/admin">Admin panel</Link></li>
                      <li><Link to="/start">Starting scene</Link></li>
                      <li><Link to="/pause">Pause scene</Link></li>
                  </ul>
              </Route>
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
