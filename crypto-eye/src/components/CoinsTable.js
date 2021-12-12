import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import {
  Container,
  createTheme,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const { currency } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchCoins();
    // eslint-disable-next-line
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h5"
          style={{
            margin: 18,
            fontFamily: "Montserrat",
            fontWeight: "lighter",
          }}
        >
          CRYPTOCURRENCY PRICES BY MARKET CAP
        </Typography>
        <TextField
          label="Search for a Cryptocurrency..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
