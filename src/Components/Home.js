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
      general: [],
      sports: [],
      technology: []
    };
  }

  newsList = (category) => {
    fetch(`https://newsapi.org/v2/top-headlines?country=gb&category=${category}&apiKey=3ed6a3947a1a4d5d9cdce36b1bcb923a`)
      .then((response) => response.json())
      .then((response) => {
        var news = response.articles
        if (category === "technology") {
          this.setState({ technology: news });
        } else if (category === "sports") {
          this.setState({ sports: news });
        }
        else {
          this.setState({ general: news });
        }
        console.log(news);
      });
  };

  componentDidMount() {
    this.newsList("general");
    this.newsList("sports");
    this.newsList("technology");
  }

  render() {
    const {general, sports, technology} = this.state;
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

          <Navigation general={general} sports={sports} technology={technology} />

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
