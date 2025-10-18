import React, { useState, useMemo } from "react";
import jsonData from "./canonical_visits.json";

export default function CounterTable() {
  // Extract actual data from PHPMyAdmin export format
  const sampleData = jsonData.find((item) => item.type === "table")?.data || [];

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sort, setSort] = useState({ field: "tm", dir: "desc" });

  const filtered = useMemo(() => {
    let rows = sampleData;

    // --- Search filter ---
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.canonical_path.toLowerCase().includes(q) ||
          r.page_id.toString().includes(q)
      );
    }

    // --- Date range filter ---
    if (startDate || endDate) {
      const start = startDate
        ? new Date(startDate + "T00:00:00")
        : new Date("1900-01-01T00:00:00");
      const end = endDate
        ? new Date(endDate + "T23:59:59")
        : new Date("9999-12-31T23:59:59");

      rows = rows.filter((r) => {
        const d = new Date(r.tm.replace(" ", "T"));
        return d >= start && d <= end;
      });
    }
    // --- Sorting ---
    rows = [...rows].sort((a, b) => {
      const A = a[sort.field];
      const B = b[sort.field];
      if (A === B) return 0;
      return sort.dir === "asc" ? (A > B ? 1 : -1) : A < B ? 1 : -1;
    });

    return rows;
  }, [search, startDate, endDate, sort, sampleData]);

  const toggleSort = (field) => {
    setSort((prev) =>
      prev.field === field
        ? { field, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { field, dir: "asc" }
    );
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Page Statistics</h2>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 12,
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search (URL or ID)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 6, border: "1px solid #ccc", borderRadius: 4 }}
        />

        <label>
          Start:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              marginLeft: 4,
              padding: 6,
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
        </label>

        <label>
          End:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              marginLeft: 4,
              padding: 6,
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
        </label>
      </div>

      {/* Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 14,
        }}
      >
        <thead>
          <tr>
            <th
              onClick={() => toggleSort("page_id")}
              style={{
                cursor: "pointer",
                borderBottom: "2px solid #ccc",
                textAlign: "left",
                padding: "8px",
              }}
            >
              ID {sort.field === "page_id" && (sort.dir === "asc" ? "▲" : "▼")}
            </th>
            <th
              onClick={() => toggleSort("canonical_path")}
              style={{
                cursor: "pointer",
                borderBottom: "2px solid #ccc",
                textAlign: "left",
                padding: "8px",
              }}
            >
              URL{" "}
              {sort.field === "canonical_path" &&
                (sort.dir === "asc" ? "▲" : "▼")}
            </th>
            <th
              onClick={() => toggleSort("tm")}
              style={{
                cursor: "pointer",
                borderBottom: "2px solid #ccc",
                textAlign: "left",
                padding: "8px",
              }}
            >
              Timestamp{" "}
              {sort.field === "tm" && (sort.dir === "asc" ? "▲" : "▼")}
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((row, i) => (
            <tr key={i}>
              <td
                style={{
                  borderBottom: "1px solid #eee",
                  padding: "8px",
                }}
              >
                {row.page_id}
              </td>
              <td
                style={{
                  borderBottom: "1px solid #eee",
                  padding: "8px",
                }}
              >
                <a href={row.canonical_path} target="_blank" rel="noreferrer">
                  {row.canonical_path}
                </a>
              </td>
              <td
                style={{
                  borderBottom: "1px solid #eee",
                  padding: "8px",
                }}
              >
                {row.tm}
              </td>
            </tr>
          ))}
          {!filtered.length && (
            <tr>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  padding: 10,
                  color: "#777",
                }}
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
