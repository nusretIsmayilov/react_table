import data from "./canonical_visits.json";
export default function Table({head, body }) {
         console.log("Loaded JSON:", data);

  return (
    <table>
      <thead>
        <tr>
          {head.map((h, key) =>(
            <th key = {key}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
            <tr key={i}>
              <td>{item.page_id}</td>
              <td>{item.canonical_path}</td>
              <td>{item.tm}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
