import './App.css';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <p>LOL</p>
      <Switch>
        <Route 
            exact
            path="/">
            <p>Main page</p>
        </Route>
        <Route 
            exact
            path="/saved-news">
            <p>saved-news</p>
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
