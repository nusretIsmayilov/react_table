import * as React from "react";
import BasicDateRangePicker from "./BasicDateRangePicker";
import DataTable from "./DataTable";

function App() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <div>
      <BasicDateRangePicker value={value} onChange={setValue} />
      <DataTable />
    </div>
  );
}

export default App;