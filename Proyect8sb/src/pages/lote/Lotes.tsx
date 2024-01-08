import { GridColDef } from "@mui/x-data-grid";
import DataTableH from "../../components/datatableH/DataTableH";
import "./lotes.scss"; // Asegúrate de tener el archivo de estilos adecuado
import { useState } from "react";
import AddLotes from "../../components/modalLotes/AddLotes"; // Asegúrate de tener el componente modal adecuado
import { userRows } from "../../data";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "codigo",
    type: "int",
    width: 150,
  },
  {
    field: "nombre_del_lote",
    type: "string",
    headerName: "Nombre",
    width: 150,
  },
  {
    field: "area",
    type: "number",
    headerName: "Área",
    width: 150,
  },
  // Agrega aquí más columnas según tus necesidades
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
