import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import {
  Container,
  createTheme,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Banner/SlideShow";

const useStyles = makeStyles({
  row: {
    backgroundColor: "#f2fff4",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#d1ffd8",
      transition: "all 0.2s ease-in-out",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "rgb(44, 184, 94)",
    },
  },
});

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const classes = useStyles();

  const { currency, symbol } = CryptoState();

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

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "rgb(44, 184, 94)",
      },
    },
  });

  const columns = ["Coin", "Price", "24 Change", "Market Cap"];

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{
            margin: 18,
            fontFamily: "sans-serif",
            marginTop: 40,
            marginBottom: 60,
            color: "#2e2e2e",
          }}
        >
          CRYPTOCURRENCY PRICES BY MARKET CAP
        </Typography>
        <TextField
          label="Search for a Cryptocurrency..."
          variant="outlined"
          color="secondary"
          style={{
            marginBottom: 20,
            width: "100%",
          }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "rgb(44, 184, 94)" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "rgb(44, 184, 94)" }}>
                <TableRow>
                  {
                    // eslint-disable-next-line
                    columns.map((header) => {
                      if (header === columns[0]) {
                        return (
                          <TableCell
                            style={{
                              color: "white",
                              fontWeight: "700",
                              fontFamily: "sans-serif",
                              borderTopLeftRadius: "5px",
                            }}
                            key={header}
                            align={header === "Coin" ? "" : "right"}
                          >
                            {header}
                          </TableCell>
                        );
                      } else if (
                        header === columns[1] ||
                        header === columns[2]
                      ) {
                        return (
                          <TableCell
                            style={{
                              color: "white",
                              fontWeight: "700",
                              fontFamily: "sans-serif",
                            }}
                            key={header}
                            align={header === "Coin" ? "" : "right"}
                          >
                            {header}
                          </TableCell>
                        );
                      } else if (header === columns[3]) {
                        return (
                          <TableCell
                            style={{
                              color: "white",
                              fontWeight: "700",
                              fontFamily: "sans-serif",
                              borderTopRightRadius: "5px",
                            }}
                            key={header}
                            align={header === "Coin" ? "" : "right"}
                          >
                            {header}
                          </TableCell>
                        );
                      }
                    })
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                          color: "black",
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 22,
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: "black",
                        }}
                      >
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 520,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h != null
                          ? row.price_change_percentage_24h.toFixed(2)
                          : "---"}
                        %
                      </TableCell>
                      <TableCell align="right" style={{}}>
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}{" "}
                        M
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
