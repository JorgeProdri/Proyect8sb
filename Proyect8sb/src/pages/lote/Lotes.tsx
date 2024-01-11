import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTableL from "../../components/datatablelote/DatatableL";
import "./lotes.scss";
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
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchLotesData();
  }, []);

  const fetchLotesData = () => {
    axios.get("http://104.248.120.74/8sb/api/Lote.php")
      .then((response) => {
        const lotesWithId: Lote[] = response.data.map((lote: Lote) => ({
          ...lote,
          id: lote.cod_lote,
        }));
        setLotes(lotesWithId);
      })
      .catch((error) => {
        console.error("Error al obtener datos de lotes:", error);
      });
  };

  const handleAddLotes = (data: { nomb_lote: string, dimenx_lote: string, dimeny_lote: string, estado_lote: string, cod_hacienda: string }) => {
    console.log("Datos recibidos en handleAddLotes:", data);

    // Añadir el campo 'action' a los datos
    const dataWithAction = { ...data, action: 'create' };

    axios.post("http://104.248.120.74/8sb/api/Lote.php", dataWithAction)
      .then(response => {
        console.log("Respuesta de la API:", response.data);
        fetchLotesData();
      })
      .catch(error => {
        console.error("Error al enviar datos a la API:", error);
        // Manejar el error según tus necesidades
      });

    setOpen(false);
  };

  return (
    <div className="lotes">
      <h1>Lotes</h1>
      <div className="button">
        <button onClick={() => setOpen(true)}>Agregar Lote</button>
      </div>
      <AddLotes open={open} handleClose={() => setOpen(false)} handleAddLotes={handleAddLotes} />
      <DataTableL columns={columns} rows={lotes} slug="lote" setLotes={setLotes} />
    </div>
  );
};

export default Lotes;
