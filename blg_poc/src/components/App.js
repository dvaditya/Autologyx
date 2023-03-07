import React, { useEffect } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import history from 'utils/history';
import { UserWrapper, Alerts, GlobalErrors } from 'components/util';
import { AppBars, PageLoader } from './lib';
import {
  Landing,
  ClientsDashboard,
  AuditsDashboard,
  ClientCreation,
  Task
} from './views';
import 'styles/index.css';

function App({ formData }) {

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, []);

  return (
      <Provider store={store}>
        <Alerts />
        <GlobalErrors />
        <UserWrapper {...formData}>
          <HashRouter history={history}>
            <Route path="/" exact component={Landing} />
            {<Route path="/management">
              <AppBars>
                <Route path="/management/create" component={ClientCreation} />
                <Route path="/management/client" component={ClientsDashboard} />
                <Route exact path="/management/audit" component={AuditsDashboard} />
                <Route path="/management/audit/:auditId/module/:taskId" component={Task} />
              </AppBars>
  </Route>}
          </HashRouter>
        </UserWrapper>
        <PageLoader />
      </Provider>
  );
}

export default App;
