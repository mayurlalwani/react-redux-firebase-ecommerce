import Homepage from './pages/homepage';
import Registration from './pages/Registration';
import { Route, Switch } from 'react-router-dom';

import './default.scss';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <MainLayout>
              <Homepage />
            </MainLayout>
          )}
        />
        <Route
          path="/registration"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
