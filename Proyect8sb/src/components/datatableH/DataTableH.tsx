import React from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./dataTableh.scss";
import axios from "axios";

interface Hacienda {
  cod_hacienda: number;
  nomb_hacienda: string;
  direccion_hacienda: string;
  contac_hacienda: number;
}

type Props = {
  columns: GridColDef[];
  rows: Hacienda[];  // Corregido aquí
  slug: string;
  setHaciendas: React.Dispatch<React.SetStateAction<Hacienda[]>>;  // Corregido aquí
};

const DataTableH: React.FC<Props> = (props) => {
  const { columns, rows, slug, setHaciendas } = props;

  const handleDelete = (id: number) => {
    axios.delete(`http://104.248.120.74/8sb/api/Hacienda.php?id=${id}&action=delete`)
      .then(response => {
        console.log("Respuesta de la API:", response.data);

        // Lógica adicional después de eliminar, si es necesario
        console.log("Hacienda eliminada correctamente");

        // Actualiza la lista de haciendas, puedes hacer otra solicitud GET o actualizar el estado directamente
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
        console.error("Error al eliminar hacienda:", error);
        // Maneja el error según tus necesidades
      });
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${slug}/${params.row.id}`}>
            <img src="/view.svg" alt="" />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        rows={rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTableH;
