import React, { useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Header from './components/Header/Header';
import GniWorld from './components/GniWorld/GniWorld';
import Details from './pages/Details';

const App = () => {
  const initialPath = {
    path: '/',
    groupId: '',
    currentCategory: {
      current: 'region',
      other: 'income',
    },
  };

  const [path, setPath] = useState(initialPath);

  const updatePath = (newPath) => {
    if (path !== newPath) {
      setPath(() => newPath);
    }
  };

  return (
    <>
      <Router>
        <div className="App">
          <Header currentPath={path} updatePath={updatePath} />
          <Switch>
            <Route exact path="/">
              <GniWorld updatePath={updatePath} currentCategory={path.currentCategory} />
            </Route>
            <Route path={path.path}>
              <Details groupId={path.groupId} />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
