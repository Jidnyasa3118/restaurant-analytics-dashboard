import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function RevenueChart({ data }) {
  return (
    <div className="chart-container">
      <h2>Revenue Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="daily_revenue" fill="#2196f3" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
