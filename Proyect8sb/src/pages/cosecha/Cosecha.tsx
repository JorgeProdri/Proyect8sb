
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
    field: "fecha",
    type: "date",
    headerName: "Fecha de cosecha",
    width: 200,
  },
  {
    field: "Produccion",
    type: "date",
    headerName: "Produccion Cosecha",
    width: 200,
  },
  {
    field: "Estado",
    type: "date",
    headerName: "Estado de la Cosecha",
    width: 200,
  },
  {
    field: "cod lote",
    type: "date",
    headerName: "Codigo del lote",
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
