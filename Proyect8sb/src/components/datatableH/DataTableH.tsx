import React from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from "axios";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};

const DataTableH: React.FC<Props> = (props) => {
  const { columns, rows, slug } = props;

  const handleDelete = (id: number) => {
    // Realiza la lógica de eliminación aquí
    axios.delete(`http://104.248.120.74/8sb/api/Hacienda.php?id=${id}&action=delete`)
      .then(() => {
        // Lógica adicional después de eliminar, si es necesario
        console.log("Hacienda eliminada correctamente");
        // Actualiza la lista de haciendas, puedes hacer otra solicitud GET o actualizar el estado directamente
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
