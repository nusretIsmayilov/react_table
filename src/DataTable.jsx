import React, { useState, useMemo } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import jsonData from "./canonical_visits.json";
import BasicDateRangePicker from "./BasicDateRangePicker";
import Box from "@mui/material/Box";
import dayjs from "dayjs";

const columns = [
  { field: "page_id", headerName: "ID", width: 130, type: "number" },
  {
    field: "canonical_path",
    headerName: "URL",
    width: 420,
    renderCell: (params) => (
      <a
        href={params.value}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1976d2", textDecoration: "none" }}
        onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
        onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
      >
        {params.value}
      </a>
    ),
  },
  { field: "month", headerName: "Month", width: 120 },
  { field: "tm", headerName: "Timestamp", width: 190, flex: 1 },
];

const sampleData =
  jsonData
    .find((item) => item.type === "table")
    ?.data.map((item, index) => ({ ...item, id: index })) || [];

const paginationModel = { page: 0, pageSize: 40 };

export default function DataTable() {
const [dateRange, setDateRange] = useState([null, null]);

  const filteredRows = useMemo(() => {
    const [start, end] = dateRange;

    if (!start && !end) return sampleData;

    const startDate = start ? dayjs(start).startOf("day") : dayjs("1900-01-01");
    const endDate = end ? dayjs(end).endOf("day") : dayjs("9999-12-31");

    return sampleData.filter((row) => {
      const tm = dayjs(row.tm);
      return tm.isAfter(startDate) && tm.isBefore(endDate);
    });
  }, [dateRange]);

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ marginBottom: 2 }}>
        <BasicDateRangePicker value={dateRange} onChange={setDateRange} />
      </Box>

      <Paper sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[40, 120]}
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
}
