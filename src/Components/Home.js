import React from "react";
import AppBar from "@material-ui/core/AppBar";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Navigation from "./Navigation/Navigation";
import SearchBox from "./SearchBox";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://emtropylabs.com/">
        Emtropy Labs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
  AnnouncementIcon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ind: JSON.parse(localStorage.getItem("in")) || [],
      gb: JSON.parse(localStorage.getItem("gb")) || [],
      us: JSON.parse(localStorage.getItem("us")) || [],
      searchField: "",
    };
  }

  newsList = (country, page, pageSize, search) => {
    search = this.state.searchField;
    fetch(
      `https://gnews.io/api/v4/top-headlines?country=gb&q=${search}&pageSize=${pageSize}&page=${page}&country=${country}&token=c5a09355e51e46f98d749d7d6046a626`
    )
      .then((response) => response.json())
      .then((response) => {
        var news = response.articles;
        if (JSON.parse(localStorage.getItem(country)) !== null || undefined) {
          news = JSON.parse(localStorage.getItem(country));
          // news = news.map((x) => ({ ...x, likes: 0, display: "block" }));
        } else {
          news = news.map((x) => ({ ...x, likes: 0, display: "block" }));
        }
        if (country === "gb") {
          this.setState({ us: news }, () => {
            localStorage.setItem("us", JSON.stringify(this.state.us));
          });
        } else if (country === "us") {
          this.setState({ gb: news }, () => {
            localStorage.setItem("gb", JSON.stringify(this.state.gb));
          });
        } else {
          this.setState({ ind: news }, () => {
            localStorage.setItem("in", JSON.stringify(this.state.ind));
          });
        }
        console.log(news);
      });
  };

  inVisibility = (x) => {
    let newArr = [...this.state.ind];
    newArr[x]["display"] === "block"
      ? (newArr[x]["display"] = "none")
      : (newArr[x]["display"] = "block");
    this.setState({ ind: newArr }, () => {
      localStorage.setItem("in", JSON.stringify(this.state.ind));
    });
  };

  gbVisibility = (x) => {
    let newArr = [...this.state.gb];
    newArr[x]["display"] === "block"
      ? (newArr[x]["display"] = "none")
      : (newArr[x]["display"] = "block");
    this.setState({ gb: newArr }, () => {
      localStorage.setItem("gb", JSON.stringify(this.state.gb));
    });
  };

  usVisibility = (x) => {
    let newArr = [...this.state.us];
    newArr[x]["display"] === "block"
      ? (newArr[x]["display"] = "none")
      : (newArr[x]["display"] = "block");
    this.setState({ us: newArr }, () => {
      localStorage.setItem("us", JSON.stringify(this.state.us));
    });
  };

  inLikeCount = (x) => {
    let newArr = [...this.state.ind];
    newArr[x]["likes"] = parseInt(newArr[x]["likes"]) + 1;
    this.setState({ ind: newArr }, () => {
      localStorage.setItem("in", JSON.stringify(this.state.ind));
    });
  };

  gbLikeCount = (x) => {
    let newArr = [...this.state.gb];
    newArr[x]["likes"] = parseInt(newArr[x]["likes"]) + 1;
    this.setState({ gb: newArr }, () => {
      localStorage.setItem("gb", JSON.stringify(this.state.gb));
    });
  };

  usLikeCount = (x) => {
    let newArr = [...this.state.us];
    newArr[x]["likes"] = parseInt(newArr[x]["likes"]) + 1;
    this.setState({ us: newArr }, () => {
      localStorage.setItem("us", JSON.stringify(this.state.us));
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.setState({ searchField: event.target.value });
      console.log("do validate");
    }
  };

  componentDidMount() {
    this.newsList("in", 1, 15, "");
    this.newsList("gb", 1, 20, "");
    this.newsList("us", 1, 30, "");
  }

  render() {
    const { ind, gb, us } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.AnnouncementIcon}
              color="inherit"
              aria-label="menu"
            >
              <AnnouncementIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              EMTROPY NEWS
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Emtropy News
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Emtropy News is a simple React application that consumes the{" "}
                <a href="https://newsapi.org">NewsAPI</a> to show headlines from
                all around the globe.
              </Typography>
            </Container>
          </div>
          <SearchBox handleKeyDown={this.handleKeyDown} />
          <Navigation
            inLikeCount={this.inLikeCount}
            gbLikeCount={this.gbLikeCount}
            usLikeCount={this.usLikeCount}
            ind={ind}
            gb={gb}
            us={us}
            inVisibility={this.inVisibility}
            gbVisibility={this.gbVisibility}
            usVisibility={this.usVisibility}
          />
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Emtropy News
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Built for Emtropy Labs by Gad Jacobs
          </Typography>
          <Copyright />
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
