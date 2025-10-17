import React, { useState, useMemo } from "react";
import jsonData from "./canonical_visits.json";

export default function CounterTable() {
  const sampleData =
    jsonData.find((item) => item.type === "table")?.data || [];

  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [sort, setSort] = useState({ field: "tm", dir: "desc" });

  const filtered = useMemo(() => {
    let rows = sampleData;

    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.canonical_path.toLowerCase().includes(q) ||
          r.page_id.toString().includes(q)
      );
    }

    if (month) {
      rows = rows.filter((r) => r.tm.startsWith(month));
    }

    rows = [...rows].sort((a, b) => {
      const A = a[sort.field];
      const B = b[sort.field];
      if (A === B) return 0;
      return sort.dir === "asc" ? (A > B ? 1 : -1) : (A < B ? 1 : -1);
    });

    return rows;
  }, [search, month, sort, sampleData]);

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

      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Search (URL or ID)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 6, border: "1px solid #ccc", borderRadius: 4 }}
        />
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{ padding: 6, border: "1px solid #ccc", borderRadius: 4 }}
        />
      </div>

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
              Timestamp {sort.field === "tm" && (sort.dir === "asc" ? "▲" : "▼")}
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
