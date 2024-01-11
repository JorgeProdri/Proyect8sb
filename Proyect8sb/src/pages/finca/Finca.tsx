import { useEffect, useState } from "react";
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
    axios.get("http://104.248.120.74/8sb/api/Hacienda.php")
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

    // Añadir el campo 'action' a los datos
    const dataWithAction = { ...data, action: 'create' };

    axios.post("http://104.248.120.74/8sb/api/Hacienda.php", dataWithAction)
      .then(response => {
        console.log("Respuesta de la API:", response.data);
        axios.get("http://104.248.120.74/8sb/api/Hacienda.php")
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
    <div className="finca">
      <h1>Haciendas</h1>
      <div className="buttom">
        <button onClick={() => setOpen(true)}>Agregar Hacienda</button>
      </div>   
      <AddHaciendaModal open={open} handleClose={() => setOpen(false)} handleAddHacienda={handleAddHacienda} />
      <DataTableH columns={columns} rows={haciendas} slug="hacienda" setHaciendas={setHaciendas} />
    </div>
  );
};

export default Finca;
