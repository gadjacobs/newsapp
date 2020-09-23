import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import General from "../General";
import Sports from "../Sports";
import Technology from "../Technology";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.props.history.location.pathname,
    };
  }
  handleCallToRouter = (value) => {
    this.props.history.push(value);
  };

  handleChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  render() {
    const { general, sports, technology, generalLikeCount } = this.props;
    return (
      <div>
        <Tabs
          value={this.state.selectedTab}
          onChange={this.handleChange}
          indicatorColor="secondary"
          centered
        >
          <Tab
            label="General"
            component={Link}
            to="/general"
            value="/general"
          />
          <Tab label="Sports" component={Link} to="/sports" value="/sports" />
          <Tab
            label="Technology"
            component={Link}
            to="/technology"
            value="/technology"
          />
        </Tabs>

        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <General
                {...props}
                general={general}
                generalLikeCount={generalLikeCount}
              />
            )}
          />
          <Route
            path="/general"
            render={(props) => (
              <General
                {...props}
                general={general}
                generalLikeCount={generalLikeCount}
              />
            )}
          />
          <Route
            path="/sports"
            render={(props) => <Sports {...props} sports={sports} />}
          />
          <Route
            path="/technology"
            render={(props) => (
              <Technology {...props} technology={technology} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Navigation);
