import React from "react";
import { Typography, Container, makeStyles } from "@material-ui/core";
import SlideShow from "./SlideShow";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner2.svg)",
    backgroundSize: "110%",
    autoSize: true,
  },
  bannerContent: {
    height: 550,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
              color: "white",
            }}
          >
            CRYPTO EYE
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "#616161",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            All Information Available About Crypto Currencies
          </Typography>
        </div>
        <SlideShow />
      </Container>
    </div>
  );
};

export default Banner;
