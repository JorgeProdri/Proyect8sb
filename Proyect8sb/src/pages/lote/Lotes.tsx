import { GridColDef } from "@mui/x-data-grid";
import DataTableH from "../../components/datatableH/DataTableH";
import "./lotes.scss"; 
import { useState } from "react";
import AddLotes from "../../components/modalLotes/AddLotes"; 
import { userRows } from "../../data";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "codigo",
    type: "int",
    width: 100,
  },
  {
    field: "nombre del lote",
    type: "string",
    headerName: "Nombre",
    width: 120,
  },
  {
    field: "Dimension x",
    type: "number",
    headerName: "Dimension x",
    width: 150,
  },
  {
    field: "Dimension y",
    type: "number",
    headerName: "Dimension y",
    width: 150,
  },
 
];

const Lotes = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lotes">
      <div className="info">
        <h1>Lotes</h1>
        <button onClick={() => setOpen(true)}>Añadir Lote</button>
      </div>
      <DataTableH slug="Lotes" columns={columns} rows={userRows} />
      {open && <AddLotes slug="Lotes" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Lotes;
