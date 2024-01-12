import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTableC from "../../components/datatableC/DatatableC";
import "./cosecha.scss"; 
import AddCosecha from "../../components/modalCosecha/Addcosecha";
import axios from "axios";

interface Cosecha {
  id: number;
  cod_cosecha: number;
  fecha_cosecha: string;
  produc_cosecha: number;
  estado_cosecha: string;
  cod_lote: number;
}

const columns: GridColDef[] = [
  {
    field: "cod_cosecha",
    type: "number",
    width: 100,
  },
  {
    field: "fecha_cosecha",
    type: "string",
    headerName: "Fecha",
    width: 120,
  },
  {
    field: "produc_cosecha",
    type: "number",
    headerName: "Producción",
    width: 150,
  },
  {
    field: "estado_cosecha",
    type: "string",
    headerName: "Estado",
    width: 100,
  },
  {
    field: "cod_lote",
    type: "number",
    headerName: "Código Lote",
    width: 150,
  },
];

const Cosecha = () => {
  const [cosechas, setCosechas] = useState<Cosecha[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCosechasData();
  }, []);

  const fetchCosechasData = () => {
    axios
      .get("http://104.248.120.74/8sb/api/Cosecha.php")
      .then((response) => {
        const cosechasWithId: Cosecha[] = response.data.map(
          (cosecha: Cosecha) => ({
            ...cosecha,
            id: cosecha.cod_cosecha,
          })
        );
        setCosechas(cosechasWithId);
      })
      .catch((error) => {
        console.error("Error al obtener datos de cosechas:", error);
      });
  };

  const handleAddCosecha = (data: {
    fecha_cosecha: string;
    produc_cosecha: string;
    estado_cosecha: string;
    cod_lote: string;
  }) => {
    console.log("Datos recibidos en handleAddCosecha:", data);

    // Añadir el campo 'action' a los datos
    const dataWithAction = { ...data, action: "create" };

    axios
      .post("http://104.248.120.74/8sb/api/Cosecha.php", dataWithAction)
      .then((response) => {
        console.log("Respuesta de la API:", response.data);
        fetchCosechasData();
      })
      .catch((error) => {
        console.error("Error al enviar datos a la API:", error);
        // Manejar el error según tus necesidades
      });

    setOpen(false);
  };

  return (
    <div className="cosecha">
      <h1>Cosechas</h1>
      <div className="button">
        <button onClick={() => setOpen(true)}>Agregar Cosecha</button>
      </div>
      <AddCosecha
        open={open}
        handleClose={() => setOpen(false)}
        handleAddCosecha={handleAddCosecha}
      />
      <DataTableC columns={columns} rows={cosechas} setLotes={setCosechas} />
    </div>
  );
};

export default Cosecha;
