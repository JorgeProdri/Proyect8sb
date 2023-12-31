import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./finca.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { userRows } from "../../data";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "codigo",
      type: "int",
      headerName: "Code",
      width: 150,
    },
    {
      field: "nombre",
      type: "string",
      headerName: "Name",
      width: 150,
    },
    {
      field: "direccion",
      type: "string",
      headerName: "Direccion",
      width: 200,
    },
    {
      field: "contacto",
      type: "string",
      headerName: "Contacto",
      width: 200,
    },
  ];
const Finca = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="users">
      <div className="info">
        <h1>Finca</h1>
        <button onClick={() => setOpen(true)}>Añadir Finca</button>
      </div>
      <DataTable slug="finca" columns={columns} rows={userRows} />
      {open && <Add slug="finca" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Finca;
