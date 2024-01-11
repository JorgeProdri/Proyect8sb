import { useState, useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTableH from "../../components/datatableH/DataTableH";
import "./finca.scss";
import AddHaciendaModal from "../../components/modalhacienda/AddHaciendaModal";
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
  const [haciendas, setHaciendas] = useState<Hacienda[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get("http://simulacion22.000webhostapp.com/api/Hacienda.php")
      .then(response => {
        const haciendasWithId: Hacienda[] = response.data.map((hacienda: Hacienda) => ({
          ...hacienda,
          id: hacienda.cod_hacienda,
        }));
        setHaciendas(haciendasWithId);
      })
      .catch(error => console.error("Error al obtener datos de hacienda:", error));
  }, []);

  const handleAddHacienda = (data: { nomb_hacienda: string, direccion_hacienda: string, contac_hacienda: number }) => {
    console.log("Datos recibidos en handleAddHacienda:", data);

    axios.post("http://simulacion22.000webhostapp.com/api/Hacienda.php", data)
      .then(response => {
        console.log("Respuesta de la API:", response.data);
        axios.get("http://simulacion22.000webhostapp.com/api/Hacienda.php")
          .then(response => {
            const haciendasWithId: Hacienda[] = response.data.map((hacienda: Hacienda) => ({
              ...hacienda,
              id: hacienda.cod_hacienda,
            }));
            setHaciendas(haciendasWithId);
          })
          .catch(error => console.error("Error al obtener datos de hacienda:", error));
      })
      .catch(error => {
        console.error("Error al enviar datos a la API:", error);
        // Manejar el error según tus necesidades
      });

    setOpen(false);
  };

  return (
    <div className="users">
      <div className="info">
        <h1>Hacienda</h1>
        <button onClick={() => setOpen(true)}>Añadir Hacienda</button>
      </div>
      <DataTableH slug="Hacienda" columns={columns} rows={haciendas} />
      {open && <AddHaciendaModal open={open} handleClose={() => setOpen(false)} handleAddHacienda={handleAddHacienda} />}
    </div>
  );
};

export default Finca;
