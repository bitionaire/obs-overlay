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
import Root from "./routes/Root";

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
                  <WaitingScene labelKey="start.title" horizontalPosition="left" verticalPosition="center" padding="20%" background />
              </Route>
              <Route path="/pause">
                  <WaitingScene labelKey="pause.title" horizontalPosition="right" />
              </Route>
              <Route path="/end">
                  <EndScene />
              </Route>
              <Route path="/">
                    <Root />
              </Route>
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
