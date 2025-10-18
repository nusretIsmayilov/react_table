import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import jsonData from "./canonical_visits.json";

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
  {
    field: "tm",
    headerName: "Timestamp",
    width: 190,
    flex: 1
  },
];

const sampleData =
  jsonData
    .find((item) => item.type === "table")
    ?.data.map((item, index) => ({ ...item, id: index })) || [];

const rows = sampleData;

const paginationModel = { page: 0, pageSize: 40 };

export default function DataTable() {
  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[40, 120]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
