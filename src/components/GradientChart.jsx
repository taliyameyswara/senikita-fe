import React from "react";
import { createUseStyles } from "react-jss";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", productSales: 300, serviceSales: 200 },
  { month: "Feb", productSales: 500, serviceSales: 300 },
  { month: "Mar", productSales: 400, serviceSales: 250 },
  { month: "Apr", productSales: 600, serviceSales: 400 },
  { month: "May", productSales: 700, serviceSales: 500 },
  { month: "Jun", productSales: 800, serviceSales: 600 },
  { month: "Jul", productSales: 750, serviceSales: 550 },
  { month: "Aug", productSales: 900, serviceSales: 700 },
  { month: "Sep", productSales: 1100, serviceSales: 800 },
  { month: "Oct", productSales: 1200, serviceSales: 900 },
  { month: "Nov", productSales: 1300, serviceSales: 1000 },
  { month: "Dec", productSales: 1400, serviceSales: 1100 },
];

const useStyles = createUseStyles(() => ({
  container: {
    color: "#000",
    backgroundColor: "rgb(255, 255, 255)",
    padding: "1rem",
    transition: "0.3s ease-in-out",
    width: "100%",
    // height: "400px",
    fontFamily: "Nunito, sans-serif",
    border: "1px solid #ddd",
    borderRadius: "20px",
  },
  title: {
    textAlign: "center",
    color: "#333",
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
}));

const GradientColors = () => (
  <>
    <linearGradient id="productSalesGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="30%" stopColor="#A8412A" stopOpacity={0.4} />
      <stop offset="75%" stopColor="#ff9b9b" stopOpacity={0.3} />
      <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.2} />
    </linearGradient>
    <linearGradient id="serviceSalesGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="30%" stopColor="#119083" stopOpacity={0.4} />
      <stop offset="75%" stopColor="#7fe6dc" stopOpacity={0.3} />
      <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.2} />
    </linearGradient>
  </>
);

const GradientChart = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>
        Data Penjualan Produk dan Jasa per Bulan
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <GradientColors />
          </defs>
          <Tooltip
            itemStyle={{ color: "#fff", backgroundColor: "#0A1322" }}
            contentStyle={{ backgroundColor: "#0A1322" }}
          />
          <XAxis dataKey="month" tick={{ fill: "#B6BAC3" }} stroke="#EEEEEE" />
          <YAxis tick={{ fill: "#B6BAC3" }} stroke="#EEEEEE" />
          <Area
            dataKey="productSales"
            type="monotone"
            stroke="#EE680D"
            strokeWidth={3}
            fill="url(#productSalesGradient)"
          />
          <Area
            dataKey="serviceSales"
            type="monotone"
            stroke="#4dcfc2"
            strokeWidth={3}
            fill="url(#serviceSalesGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradientChart;
