import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <div className="App">
          {/* <Header /> */}
          <Switch>
            <Route exact path="/">
              {/* <Countries /> */}
              <h1>Countries here</h1>
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
