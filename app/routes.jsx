import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchVoteData } from './fetch-data';
import { App, Vote, Dashboard, About, LoginOrRegister, Code, Markdown, CodeB } from './pages';
import _ from 'lodash';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };

  const startTest = () => {
    if (typeof(window) !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({event: 'optimize.activate'});
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Markdown} />
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
      <Route path="about" component={About} />
      <Route path="code" component={Code} onEnter={_.once(startTest)} />
      <Route path="code-b" component={CodeB} />
    </Route>
  );
};
