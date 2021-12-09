import {
  AppBar,
  Container,
  Select,
  Toolbar,
  MenuItem,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
});

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  return (
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography onClick={handleClick} className={classes.title}>
            CRYPTO EYE
          </Typography>
          <Select
            variant="outlined"
            style={{ width: 100, height: 40, marginLeft: 15 }}
          >
            <MenuItem value={"EUR"}>EUR</MenuItem>
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"GBP"}>GBP</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
