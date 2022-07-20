import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import CoinInfo from '../components/CoinInfo';
import { Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from "../components/CoinsTable";
import {LinearProgress} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    "@media (max-width: 768px)": {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },

  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },

  description: {
    width: "100%",
    // fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    "@media (min-width: 768px)": {
      display: "flex",
      justifyContent: "space-around",
    },
    "@media (min-width: 576px)":  {
      flexDirection: "column",
      alignItems: "center",
    },
    "@media (max-width:576px)":  {
      alignItems: "start",
    },
  },

}));


const Coinpage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const classes = useStyles();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))
    setCoin(data)
  };
  // console.log(coin)

  useEffect(() => {
    fetchCoin();
  }, [currency]);

  if (!coin) return<LinearProgress style={{backgroundColor:"gold"}} />
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height='200'
          style={{ marginBottom: 20 }}
        />
        <Typography variant='h3' className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketdata}>
          <span style={{ display: "flex" }}>
            <Typography variant='h5' className={classes.heading}>Rank:</Typography>
            &nbsp; &nbsp;
            <Typography variant='h5'
              style={{
                fontFamily: "Monserrat",
              }}>
             {coin?.market_cap_rank}
            </Typography>  
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant='h5' className={classes.heading}>Current Price:</Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant='h5' className={classes.heading}>Market Cap:</Typography>
            &nbsp; &nbsp;
            <Typography variant='h5'
              style={{
                fontFamily: "Monserrat",
              }}>
            {symbol}{" "}
            {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}
             M
            </Typography>  
          </span>

        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
    
  )
}

export default Coinpage;