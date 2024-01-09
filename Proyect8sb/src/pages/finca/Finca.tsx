import { useState, useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTableH from "../../components/datatableH/DataTableH";
import "./finca.scss";
import Addfinca from "../../components/modalfinca/addfinca";
import axios from "axios";

interface Hacienda {
  cod_hacienda: number;
  nomb_hacienda: string;
  direccion_hacienda: string;
  contac_hacienda: number;
}

const columns: GridColDef[] = [
  {
    field: "id", // Renombrado de cod_hacienda a id
    headerName: "Código",
    width: 150,
  },
  {
    field: "nomb_hacienda",
    headerName: "Nombre",
    width: 150,
  },
  {
    field: "direccion_hacienda",
    headerName: "Dirección",
    width: 200,
  },
  {
    field: "contac_hacienda",
    headerName: "Contacto",
    width: 200,
  },
];

const Finca = () => {
  const [haciendas, setHaciendas] = useState<Hacienda[]>([]); // Asegúrate de tener el tipo Hacienda aquí
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get("https://simulacion7sb.000webhostapp.com/8SB/hacienda.php")
      .then(response => {
        // Renombrar el campo cod_hacienda a id
        const haciendasWithId: Hacienda[] = response.data.map((hacienda: Hacienda) => ({
          ...hacienda,
          id: hacienda.cod_hacienda,
        }));
        setHaciendas(haciendasWithId);
      })
      .catch(error => console.error("Error al obtener datos de hacienda:", error));
  }, []);

  return (
    <div className="users">
      <div className="info">
        <h1>Hacienda</h1>
        <button onClick={() => setOpen(true)}>Añadir Hacienda</button>
      </div>
      <DataTableH slug="Hacienda" columns={columns} rows={haciendas} />
      {open && <Addfinca slug="Hacienda" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Finca;