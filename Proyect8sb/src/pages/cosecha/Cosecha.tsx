
import { GridColDef } from "@mui/x-data-grid";
import DataTableH from "../../components/datatableH/DataTableH";
import "./cosecha.scss"; // Asegúrate de tener el archivo de estilos adecuado
import { useState } from "react";
import AddCosecha from "../../components/modalCosecha/Addcosecha";
import { userRows } from "../../data";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "codigo",
    type: "int",
    width: 150,
  },
  {
    field: "nombre de la cosecha",
    type: "string",
    headerName: "Nombre",
    width: 150,
  },
  {
    field: "fecha_inicio",
    type: "date",
    headerName: "Fecha de Inicio",
    width: 200,
  },
  {
    field: "fecha_fin",
    type: "date",
    headerName: "Fecha de Fin",
    width: 200,
  },
];

const Cosecha = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="cosecha">
      <div className="info">
        <h1>Cosecha</h1>
        <button onClick={() => setOpen(true)}>Añadir Cosecha</button>
      </div>
      <DataTableH slug="Cosecha" columns={columns} rows={userRows} />
      {open && <AddCosecha slug="Cosecha" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Cosecha;
