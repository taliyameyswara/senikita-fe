import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { useAxiosInstance } from "../config/axiosConfig";
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
  const axiosInstance = useAxiosInstance();
  const classes = useStyles();
  const [selectedYear, setSelectedYear] = useState("2023");
  const [data, setData] = useState([]);

  const fetchData = async (year) => {
    try {
      const response = await axiosInstance.get(
        `/user/shop/products/summary-sales?year=${year}`
      );
      if (response.data && response.data.status === "success") {
        setData(response.data.summary.salesData);
      } else {
        console.error("Error: Data format not as expected", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  const dropdownCategories = [
    { key: "2023", content: "2023" },
    { key: "2024", content: "2024" },
  ];

  return (
    <div className={classes.container}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="lg:text-lg text-base  font-semibold font-raleway">
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
