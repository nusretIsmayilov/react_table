import * as React from "react";
import DataTable from "./DataTable";

function App() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <div>
      <DataTable />
    </div>
  );
}

export default App;