import {
  AppBar,
  Container,
  Select,
  Toolbar,
  MenuItem,
  Typography,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles({
  title: {
    flex: 1,
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
  header: {
    backgroundColor: "rgb(44, 184, 94)",
  },
});

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "rgb(255, 255, 255)",
      },
      type: "dark",
    },
  });

  function handleClick() {
    navigate("/");
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static" className={classes.header}>
        <Container>
          <Toolbar>
            <Typography
              onClick={handleClick}
              className={classes.title}
              variant="h6"
            >
              CRYPTO EYE
            </Typography>
            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginRight: 15 }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"GBP"}>GBP</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
