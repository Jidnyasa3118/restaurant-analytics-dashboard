import React from "react";

export default function Filters({ restaurants, filters, setFilters }) {
  return (
    <div className="filters">
        <input
         type="text"
         placeholder="Search restaurant..."
         onChange={(e) =>
             setSearch(e.target.value)
             }
       />
      <select
        value={filters.restaurant_id}
        onChange={(e) =>
          setFilters({ ...filters, restaurant_id: e.target.value })
        }
      > 
        <option value="">Select Restaurant</option>
        {restaurants.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>
  
      <input
        type="date"
        onChange={(e) =>
          setFilters({ ...filters, from: e.target.value })
        }
      />
      <input
        type="date"
        onChange={(e) =>
          setFilters({ ...filters, to: e.target.value })
        }
      />
      <input type="number" placeholder="Min Amount" />
      <input type="number" placeholder="Max Amount" />

      <input type="number" placeholder="From Hour (0-23)" />
      <input type="number" placeholder="To Hour (0-23)" />


    </div>
  );
}
