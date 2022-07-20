import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
const Crypto =createContext();

const CryptoContext=({children})=>{
  const [currency,setCurrency]=useState('INR');
  const [symbol,setSymbol]=useState("₹");
  

  useEffect(()=>{
    if(currency==="INR") setSymbol("₹");
    else if(currency==="USD") setSymbol("$")
  },[currency]);
    return (
        <Crypto.Provider value={{currency,symbol,setCurrency}}>
            {children}
        </Crypto.Provider>
    );
};

export {Crypto, CryptoContext};

export const CryptoState=()=>{
   return useContext(Crypto);
}