import React, { useEffect, useState } from "react";
import {
  getRestaurants,
  getAnalytics,
  getTopRestaurants
} from "../services/api";

import Filters from "../components/Filters";
import StatCard from "../components/StatCard";
import OrdersChart from "../components/OrdersChart";
import RevenueChart from "../components/RevenueChart";
import TopRestaurants from "../components/TopRestaurants";

export default function Dashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [filters, setFilters] = useState({
    restaurant_id: "",
    from: "",
    to: ""
  });

  useEffect(() => {
    getRestaurants().then(res => setRestaurants(res.data));
  }, []);

  useEffect(() => {
    if (!filters.from || !filters.to) return;

    getAnalytics(filters).then(res => setAnalytics(res.data));
    getTopRestaurants(filters).then(res => setTopRestaurants(res.data));
  }, [filters]);

  /* ===== CALCULATIONS ===== */
  const totalOrders = analytics.reduce(
    (sum, d) => sum + d.daily_orders,
    0
  );

  const totalRevenue = analytics.reduce(
    (sum, d) => sum + d.daily_revenue,
    0
  );

  const avgOrderValue =
    totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

  const peakHour =
    analytics.length > 0
      ? analytics.reduce((max, d) =>
          d.daily_orders > max.daily_orders ? d : max
        ).peak_hour
      : "-";

  return (
    <div className="container">
      <h1 className="dashboard-title">
        <i className="fa-solid fa-chart-line"></i>
            Restaurant Analytics Dashboard
      </h1>


      <Filters
        restaurants={restaurants}
        filters={filters}
        setFilters={setFilters}
      />

      {analytics.length > 0 && (
        <>
          <div className="stats">
            <StatCard title="Total Orders" value={totalOrders} />
            <StatCard title="Total Revenue" value={`₹${totalRevenue}`} />
            <StatCard title="Avg Order Value" value={`₹${avgOrderValue}`} />
            <StatCard title="Peak Hour" value={`${peakHour}:00`} />
          </div>

          <OrdersChart data={analytics} />
          <RevenueChart data={analytics} />
        </>
      )}

      <TopRestaurants data={topRestaurants} />
    </div>
  );
}
