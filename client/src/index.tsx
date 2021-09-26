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
import EndScene from "./routes/EndScene";
import Overlay from "./routes/Overlay";
import './i18n';

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Switch>
              <Route path="/admin">
                  <AdminPage />
              </Route>
              <Route path="/overlay">
                  <Overlay />
              </Route>
              <Route path="/start">
                  <WaitingScene labelKey="start.title" />
              </Route>
              <Route path="/pause">
                  <WaitingScene labelKey="pause.title" />
              </Route>
              <Route path="/end">
                  <EndScene />
              </Route>
              <Route path="/">
                  <ul>
                      <li><Link to="/admin">Admin panel</Link></li>
                      <li>
                          <Link to="/overlay">Overlay</Link> | <Link to="/overlay?debug=true">Overlay (Debug)</Link>
                      </li>
                      <li><Link to="/start">Starting scene</Link></li>
                      <li><Link to="/pause">Pause scene</Link></li>
                      <li><Link to="/end">End scene</Link></li>
                  </ul>
              </Route>
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
