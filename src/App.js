import React, { useState, useEffect } from 'react';
import Homepage from './pages/homepage';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import { Route, Switch, Redirect } from 'react-router-dom';

import './default.scss';
import HomepageLayout from './layouts/HomepageLayout';
import MainLayout from './layouts/MainLayout';
import { auth, handleUserProfile } from './firebase/utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/User/user.actions';

import WithAuth from './hoc/withAuth';

const App = (props) => {
  const { setCurrentUser, currentUser } = props;

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          props.setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      setCurrentUser(userAuth);

      return () => {
        authListener();
      };
    });
  }, []);

  return (
    <div className='App'>
      <Switch>
        <Route
          exact
          path='/'
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          path='/registration'
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
        <Route
          path='/login'
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
        <Route
          path='/recovery'
          render={() =>
            currentUser ? (
              <Redirect to='/' />
            ) : (
              <MainLayout currentUser={currentUser}>
                <Recovery />
              </MainLayout>
            )
          }
        />
        <Route
          path='/dashboard'
          render={() => (
            <MainLayout currentUser={currentUser}>
              <WithAuth>
                <Dashboard />
              </WithAuth>
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
