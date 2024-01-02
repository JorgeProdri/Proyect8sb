import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./finca.scss";
import { useState } from "react";
import Addfinca from "../../components/modalfinca/Addfinca"; 
import { userRows } from "../../data";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "codigo",
    type: "int",
    headerName: "Codigo",
    width: 150,
  },
  {
    field: "nombre de la hacienda",
    type: "string",
    headerName: "Nombre",
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
    type: "int",
    headerName: "Contacto",
    width: 200,
  },
];

const Finca = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="users">
      <div className="info">
        <h1>Hacienda</h1>
        <button onClick={() => setOpen(true)}>Añadir Hacienda</button>
      </div>
      <DataTable slug="Hacienda" columns={columns} rows={userRows} />
      {open && <Addfinca slug="Hacienda" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Finca;
