import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import Charts from "../../components/Charts/Charts";
import Moralis from "moralis";
import { ethers } from "ethers";

let salesInformation = {
  buyer_address: "",
  token_address: "",
  token_id: "",
  price: "",
  date: "",
};
const LandingPage = () => {
  const date = new Date();
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    getNFTSalesData();
    const interval = setInterval(() => {
      console.log("Working");
      getNFTSalesData();
    }, 60000);
    return () => clearInterval(interval);
  });

  let getNFTSalesData = async () => {
    let tokenSales = [];

    let currentDate = date.toJSON();
    let lastThirtyDays = new Date(date.setDate(date.getDate() - 30));

    if (!Moralis.Core.isStarted) {
      try {
        await Moralis.start({
          apiKey: process.env.REACT_APP_MORALIS_API_KEY,
        });

        const response = await Moralis.EvmApi.nft.getNFTTrades({
          chain: "0x1",
          marketplace: "opensea",
          fromDate: lastThirtyDays,
          toDate: currentDate,
          address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
        });

        /*  const nftDataResponse = await Moralis.EvmApi.nft.getContractNFTs({
          chain: "0x1",
          address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
        });*/

        const salesHistory = response.json.result;
        //      const nftData = nftDataResponse.jsonResponse.result;

        //         console.log(nftData);

        if (salesHistory.length > 0) {
          for (let index = 0; index < salesHistory.length; index++) {
            const element = salesHistory[index];

            salesInformation.buyer_address = element.buyer_address;
            salesInformation.price = ethers.formatEther(element.price);
            salesInformation.token_address = element.token_address;
            salesInformation.token_id = element.token_ids[0];
            salesInformation.date = element.block_timestamp.slice(0, 10);

            tokenSales.push({ ...salesInformation });
          }
        }

        setSalesData(tokenSales);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="landing-page">
      <div className="heading text-center pt-5">
        <h1>Challenge</h1>
      </div>
      <div className="mx-auto mt-5 chart-container test">
        <Charts sales={salesData} />
      </div>

      <div className="px-5">
        <table className="mx-auto table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Buyer Address</th>
              <th scope="col">Token Address</th>
              <th scope="col">Token Id</th>
              <th scope="col">Price</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sales, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td>{sales.buyer_address}</td>
                  <td>{sales.token_address}</td>
                  <td>{sales.token_id}</td>
                  <td>{sales.price}</td>
                  <td>{sales.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LandingPage;
