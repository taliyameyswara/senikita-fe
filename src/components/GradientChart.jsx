import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import DropdownFilter from "./DropdownFilter";

const data2023 = [
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

const data2024 = [
  { month: "Jan", productSales: 1000, serviceSales: 250 },
  { month: "Feb", productSales: 600, serviceSales: 400 },
  { month: "Mar", productSales: 450, serviceSales: 300 },
  { month: "Apr", productSales: 700, serviceSales: 450 },
  { month: "May", productSales: 800, serviceSales: 550 },
  { month: "Jun", productSales: 900, serviceSales: 650 },
  { month: "Jul", productSales: 850, serviceSales: 600 },
  { month: "Aug", productSales: 1000, serviceSales: 750 },
  { month: "Sep", productSales: 1200, serviceSales: 850 },
  { month: "Oct", productSales: 1300, serviceSales: 950 },
  { month: "Nov", productSales: 1400, serviceSales: 1050 },
  { month: "Dec", productSales: 1500, serviceSales: 1150 },
];

const useStyles = createUseStyles(() => ({
  container: {
    color: "#000",
    backgroundColor: "rgb(255, 255, 255)",
    padding: "1rem",
    transition: "0.3s ease-in-out",
    width: "100%",
    fontFamily: "Nunito, sans-serif",
    border: "1px solid #ddd",
    borderRadius: "20px",
  },
}));

const GradientColors = () => (
  <>
    <linearGradient id="productSalesGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="30%" stopColor="#e7aaaa" stopOpacity={0.4} />
      <stop offset="75%" stopColor="#8B5C21" stopOpacity={0.3} />
      <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.2} />
    </linearGradient>
    <linearGradient id="serviceSalesGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="30%" stopColor="#f3c58e" stopOpacity={0.4} />
      <stop offset="75%" stopColor="#CD9651" stopOpacity={0.3} />
      <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.2} />
    </linearGradient>
  </>
);

const GradientChart = () => {
  const classes = useStyles();
  const [selectedYear, setSelectedYear] = useState("2023");

  const handleChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const data = selectedYear === "2023" ? data2023 : data2024;

  const dropdownCategories = [
    { key: "2023", content: "2023" },
    { key: "2024", content: "2024" },
  ];

  return (
    <div className={classes.container}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-raleway font-semibold">
          Data Penjualan Produk dan Jasa
        </h2>
        <DropdownFilter
          options={dropdownCategories.map((cat) => cat.content)}
          selectedOption={selectedYear}
          setSelectedOption={(option) => {
            const selected = dropdownCategories.find(
              (cat) => cat.content === option
            );
            if (selected) {
              setSelectedYear(selected.key);
            }
          }}
          label="Select Year"
          width="w-28"
        />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <GradientColors />
          </defs>
          <Tooltip
            itemStyle={{ color: "#fff", backgroundColor: "#0A1322" }}
            contentStyle={{ backgroundColor: "#0A1322" }}
          />
          <CartesianGrid strokeDasharray="4 4" stroke="#f7d0a0" opacity={0.4} />
          <XAxis dataKey="month" tick={{ fill: "#B6BAC3" }} stroke="#EEEEEE" />
          <YAxis tick={{ fill: "#B6BAC3" }} stroke="#EEEEEE" />
          <Area
            dataKey="productSales"
            type="monotone"
            stroke="#CD5151"
            strokeWidth={2}
            fill="url(#productSalesGradient)"
          />
          <Area
            dataKey="serviceSales"
            type="monotone"
            stroke="#CD9651"
            strokeWidth={2}
            fill="url(#serviceSalesGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradientChart;
