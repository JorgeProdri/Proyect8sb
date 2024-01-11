import { GridColDef } from "@mui/x-data-grid";
import DataTableH from "../../components/datatableH/DataTableH";
import "./lotes.scss";
import { useState, useEffect } from "react";
import AddLotes from "../../components/modalLotes/AddLotes";
import axios from "axios";

interface Lote {
  id: number;
  cod_lote: number;
  nomb_lote: string;
  dimenx_lote: number;
  dimeny_lote: number;
  estado_lote: string; 
  cod_hacienda: number;
}

const columns: GridColDef[] = [
  {
    field: "cod_lote",
    type: "number",
    width: 100,
  },
  {
    field: "nomb_lote",
    type: "string",
    headerName: "Nombre",
    width: 120,
  },
  {
    field: "dimenx_lote",
    type: "number",
    headerName: "Dimension x",
    width: 150,
  },
  {
    field: "dimeny_lote",
    type: "number",
    headerName: "Dimension y",
    width: 150,
  },
  {
    field: "estado_lote",
    type: "string",
    headerName: "Estado",
    width: 100,
  },
  {
    field: "cod_hacienda",
    type: "number",
    headerName: "Código Hacienda",
    width: 150,
  },
];

const Lotes = () => {
  const [open, setOpen] = useState(false);
  const [lotesData, setLotesData] = useState<Lote[]>([]);

  useEffect(() => {
    axios.get("https://simulacion7sb.000webhostapp.com/8SB/lote.php")
      .then((response) => {
        const lotesConId: Lote[] = response.data.map((lote: Lote) => ({
          ...lote,
          id: lote.cod_lote,
        }));
        setLotesData(lotesConId);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  return (
    <div className="lotes">
      <div className="info">
        <h1>Lotes</h1>
        <button onClick={() => setOpen(true)}>Añadir Lote</button>
      </div>
      <DataTableH slug="Lotes" columns={columns} rows={lotesData} />
      {open && <AddLotes slug="Lote" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Lotes;
