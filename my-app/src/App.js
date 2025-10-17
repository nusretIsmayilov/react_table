import CounterTable from "./CounterTable";
import Table from "./table.js";

function App() {
  return (
    <div className="p-4">
        {/* <CounterTable/> */}
      <Table 

      head={['ID', 'URL', '	Timestamp']}
      />
    </div>
  );
}

export default App;
