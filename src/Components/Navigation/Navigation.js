import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import India from "../India";
import England from "../England";
import Usa from "../Usa";

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
    const {
      ind,
      gb,
      us,
      inLikeCount,
      gbLikeCount,
      usLikeCount,
      inVisibility,
      gbVisibility,
      usVisibility
    } = this.props;
    return (
      <div>
        <Tabs
          value={this.state.selectedTab}
          onChange={this.handleChange}
          indicatorColor="secondary"
          centered
        >
          <Tab
            label="India"
            component={Link}
            to="/india"
            value="/india"
          />
          <Tab label="England" component={Link} to="/england" value="/england" />
          <Tab
            label="Usa"
            component={Link}
            to="/usa"
            value="/usa"
          />
        </Tabs>

        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <India
                {...props}
                ind={ind}
                visibility={inVisibility}
                inLikeCount={inLikeCount}
              />
            )}
          />
          <Route
            path="/india"
            render={(props) => (
              <India
                {...props}
                visibility={inVisibility}
                ind={ind}
                inLikeCount={inLikeCount}
              />
            )}
          />
          <Route
            path="/england"
            render={(props) => (
              <England
                {...props}
                visibility={gbVisibility}
                gb={gb}
                gbLikeCount={gbLikeCount}
              />
            )}
          />
          <Route
            path="/usa"
            render={(props) => (
              <Usa
                {...props}
                visibility={usVisibility}
                us={us}
                usLikeCount={usLikeCount}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Navigation);
