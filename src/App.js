import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Join from './Components/Join/Join';
import Chat from './Components/Chat/Chat';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Join} />
        <Route path="/chat" exact component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
