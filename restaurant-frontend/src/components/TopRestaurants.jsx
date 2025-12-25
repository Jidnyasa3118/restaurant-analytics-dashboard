import React from "react";

export default function TopRestaurants({ data }) {
  return (
   <div className="top-restaurants">
     <i className="fa-solid fa-trophy"></i>
      <h3>Top 3 Restaurants by Revenue</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i}>
              <td>{r.name}</td>
              <td>₹{r.total_revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
