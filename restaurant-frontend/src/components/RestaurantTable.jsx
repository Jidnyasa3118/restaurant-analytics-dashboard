import React from "react";

export default function RestaurantTable({ data }) {
  return (
    <div className="table-box">
      <h2>Restaurants</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Total Orders</th>
            <th>Total Revenue</th>
          </tr>
        </thead>

        <tbody>
          {data.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{r.total_orders}</td>
              <td>₹{r.total_revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
