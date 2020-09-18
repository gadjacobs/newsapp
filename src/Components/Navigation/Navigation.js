import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import General from '../General';
import Sports from "../Sports";
import Technology from "../Technology";


class Navigation extends Component {

handleCallToRouter = (value) => {
   this.props.history.push(value);
 }

  render () {
     return (
      <div>
        <AppBar position="static" color="default">
    <Tabs
      value={this.props.history.location.pathname}
      onChange={this.handleChange}
    >
      <Tab label="General" component={Link} to="/general" />
      <Tab label="Sports" component={Link} to="/sports" />
      <Tab label="Technology" component={Link} to="/technology" />
    </Tabs>
  </AppBar>

  <Switch>
    <Route path="/general" component={General} />
    <Route path="/sports" component={Sports} />
    <Route path="/technology" component={Technology} />
  </Switch>
      </div>
    )
  }
}

export default withRouter(Navigation)