import React, { useState, useMemo } from "react";

const sampleData = [
  { page_id: "1073", canonical_path: "/about/news/nicht-nur-luxus/", tm: "2025-10-06 17:30:28" },
  { page_id: "825", canonical_path: "/unsere-angebote/haus-am-sudhang-von-agarone/", tm: "2025-10-06 17:34:15" },
  { page_id: "826", canonical_path: "/unsere-angebote/haus-am-sudhang-von-agarone/", tm: "2025-10-06 17:34:32" },
  { page_id: "424", canonical_path: "/objekt-des-monats/", tm: "2025-10-06 17:34:36" },
  { page_id: "1148", canonical_path: "/objekt-des-monats/", tm: "2025-10-06 17:34:47" },
  { page_id: "30", canonical_path: "/unsere-angebote/", tm: "2025-10-06 17:34:48" },
  { page_id: "653", canonical_path: "/unsere-angebote/", tm: "2025-10-06 17:35:10" },
  { page_id: "110", canonical_path: "/unsere-angebote/bezaubernde-villetta-in-ronco-s.ascona/", tm: "2025-10-06 17:36:07" },
  { page_id: "1959", canonical_path: "/unsere-angebote/bezaubernde-villetta-in-ronco-s.ascona/", tm: "2025-10-06 17:36:27" },
  { page_id: "30", canonical_path: "/unsere-angebote/", tm: "2025-10-06 17:37:41" },
  { page_id: "653", canonical_path: "/unsere-angebote/", tm: "2025-10-06 17:37:43" },
  { page_id: "424", canonical_path: "/objekt-des-monats/", tm: "2025-10-06 17:37:43" },
];

export default function CounterTable() {
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState(""); // YYYY-MM
  const [sort, setSort] = useState({ field: "tm", dir: "desc" });

  const filtered = useMemo(() => {
    let rows = sampleData;

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.canonical_path.toLowerCase().includes(q) ||
          r.page_id.toString().includes(q)
      );
    }

    // Month filter
    if (month) {
      rows = rows.filter((r) => r.tm.startsWith(month));
    }

    // Sorting
    rows = [...rows].sort((a, b) => {
      const A = a[sort.field];
      const B = b[sort.field];
      if (A === B) return 0;
      return sort.dir === "asc" ? (A > B ? 1 : -1) : (A < B ? 1 : -1);
    });

    return rows;
  }, [search, month, sort]);

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

      {/* Search and Month Filter */}
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
              URL {sort.field === "canonical_path" && (sort.dir === "asc" ? "▲" : "▼")}
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
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{row.page_id}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                <a href={row.canonical_path} target="_blank" rel="noreferrer">
                  {row.canonical_path}
                </a>
              </td>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{row.tm}</td>
            </tr>
          ))}
          {!filtered.length && (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: 10, color: "#777" }}>
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
    