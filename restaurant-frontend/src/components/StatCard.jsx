import React from "react";

export default function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <i className="fa-solid fa-bag-shopping"></i>
      <h4 className="stat-title">{title}</h4>
      <p className="stat-value">{value}</p>
    </div>
  );
}
