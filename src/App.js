import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navibar from './components/Nav';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Tasks from './components/Tasks';
import CreateTask from './components/CreateTask';

function App() {
  return (
    <Router>
    <div className="about">
      <Navibar/>
      <Switch>
        <Route path="/tasks" component={Tasks} />
        <Route path="/create" component={CreateTask} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
