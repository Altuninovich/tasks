import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navibar from './components/Nav';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Tasks from './components/Tasks/Tasks';
import CreateTask from './components/CreateTask/CreateTask';
import * as actions from './actions/index';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const actionCreators = {
  verifyingAuthFromlocalStorageThunk: actions.verifyingAuthFromlocalStorageThunk,
}

function App(props) {
  const {verifyingAuthFromlocalStorageThunk} = props
  useEffect(() => verifyingAuthFromlocalStorageThunk(), [])

  return (
    <Router>
    <div className="about">
      <Navibar/>
      <Switch>
        <Route exact path="/" component={Tasks} />
        <Route path="/create" component={CreateTask} />
      </Switch>
    </div>
    </Router>
  );
}

export default connect(null, actionCreators)(App);
