import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Spinner from "react-spinkit";

const styles = (theme) => ({
  root: {
    maxWidth: 345,
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
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
});


const Usa = ({ us, classes, usLikeCount, visibility }) => {

  return !us.length ? (
    <article className="vh-100 dt w-100">
      <div className="dtc v-mid tc white ph3 ph4-l">
        <h2 className="f6 f2-m f-subheadline-l fw6 tc">
          <Spinner name="line-scale" />
        </h2>
      </div>
    </article>
  ) : (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {us.map((gen, i) => (

          <Box display={us[i].display} component={Grid} item key={i} xs={12} sm={6} md={4} >
            <Card className={classes.root}>
              <CardHeader
                title={us[i]["author"]}
                subheader={us[i]["publishedAt"].slice(0, 10)}
              />
              <>
                {us[i].image ? (
                 <CardMedia
                 className={classes.media}
                 image={us[i].image}
                 title="News Image"
               />
                ) : (
                  <Spinner name="line-scale" />
                )}
              </>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {us[i].title}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton onClick={() => usLikeCount(i)} aria-label="add to favorites">
                  <FavoriteIcon /> {us[i].likes}
                </IconButton>
                <IconButton onClick={() => visibility(i)} aria-label="share">
                  <DeleteIcon />
                </IconButton>
                <a
                  href={us[i].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="small" color="primary">
                    VIEW MORE
                  </Button>
                </a>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};

Usa.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Usa);
