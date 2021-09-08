import React, { useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Header from './components/Header/Header';
import GniWorld from './components/GniWorld/GniWorld';
import Details from './pages/Details';
// import { useEffect } from 'react';

// import Header from './components/Header';

const App = () => {
  const initialPath = {
    path: '/',
    groudId: '',
  };

  // const location = useLocation();

  const [path, setPath] = useState(initialPath);

  /* useEffect(() => {
    path =
  }, []) */

  const updatePath = (newPath) => setPath(() => newPath);

  console.log('path: ', path);

  return (
    <>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <GniWorld updatePath={updatePath} />
            </Route>
            <Route path={path.path}>
              <Header />
              <Details group={path.groudId} updatePath={updatePath} />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
