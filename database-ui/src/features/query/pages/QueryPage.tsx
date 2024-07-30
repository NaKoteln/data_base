import { useState } from "react";
import { Button, Input, Table } from "reactstrap";
import { httpClient } from "../../../httpClient/httpClient";

function QueryPage() {
  const [sql, setSql] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>();

  const run = async () => {
    const response = await httpClient("/api/query", {
      method: "POST",
      body: JSON.stringify({ sql }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    setResult(json);
  };

  return (
    <>
      <Input
        type="textarea"
        value={sql}
        onChange={(e) => setSql(e.target.value)}
      />
      <br />
      <Button onClick={run}>Run</Button>
      <br />
      <br />
      {result &&
        (result[1]?.command == "SELECT" ? (
          <Table>
            <thead>
              <tr>
                {result[1].fields.map((f: { name: string }) => (
                  <th key={f.name}>{f.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result[1].rows.map(
                (
                  row: {
                    [x: string]: string | number | boolean | null | undefined;
                  },
                  i: number
                ) => (
                  <tr key={i}>
                    {result[1].fields.map((f: { name: string }) => (
                      <td key={f.name}>{row[f.name]}</td>
                    ))}
                  </tr>
                )
              )}
              <tr></tr>
            </tbody>
          </Table>
        ) : (
          <div>
            <pre>{JSON.stringify(result, undefined, 4)}</pre>
          </div>
        ))}
    </>
  );
}

export default QueryPage;
