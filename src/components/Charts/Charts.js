import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./Charts.css";

const Charts = (props) => {
  const [dateData, setDateData] = useState([]);
  const [priceData, setPriceData] = useState([]);

  let salesData = props.sales;

  useEffect(() => {
    let getDate = [];
    let getPrice = [];

    for (let i = 0; i < salesData.length; i++) {
      getDate.push(salesData[i].date);
      getPrice.push(salesData[i].price);
    }

    setDateData(getDate.reverse());
    setPriceData(getPrice.reverse());
  });

  const options = {
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "BAYC SALES HISTORY",
      align: "left",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [30, 90, 100],
      },
    },
    yaxis: {
      title: {
        text: "Price",
      },
    },
    xaxis: {
      categories: dateData,
      title: {
        text: "Date",
      },
    },
  };

  const series = [
    {
      name: "Sales",
      data: priceData,
    },
  ];

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="area" width="500" />
        </div>
      </div>
    </div>
  );
};

export default Charts;
