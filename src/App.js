import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import GniWorld from './components/GniWorld';

// import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <GniWorld />
            </Route>
            {/* <Route path="/Missions">
              <Missions />
            </Route> */}
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
