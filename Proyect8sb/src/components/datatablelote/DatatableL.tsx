import React from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
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

type Props = {
  columns: GridColDef[];
  rows: Lote[];  // Cambiado aquí
  slug: string;
  setLotes: React.Dispatch<React.SetStateAction<Lote[]>>;  // Cambiado aquí
};

const DataTableL: React.FC<Props> = (props) => {
  const { columns, rows, slug, setLotes } = props;

  const handleDelete = (id: number) => {
    axios.delete(`http://104.248.120.74/8sb/api/Lote.php?id=${id}&action=delete`)
      .then(response => {
        console.log("Respuesta de la API:", response.data);

        // Lógica adicional después de eliminar, si es necesario
        console.log("Lote eliminado correctamente");

        // Actualiza la lista de lotes, puedes hacer otra solicitud GET o actualizar el estado directamente
        axios.get("http://104.248.120.74/8sb/api/Lote.php")
          .then(response => {
            const lotesWithId: Lote[] = response.data.map((lote: Lote) => ({
              ...lote,
              id: lote.cod_lote,
            }));
            setLotes(lotesWithId);
          })
          .catch(error => console.error("Error al obtener datos de lotes:", error));
      })
      .catch(error => {
        console.error("Error al eliminar lote:", error);
        // Maneja el error según tus necesidades
      });
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Acción",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${slug}/${params.row.id}`}>
            <img src="/view.svg" alt="Ver" />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="Eliminar" />
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

export default DataTableL;
