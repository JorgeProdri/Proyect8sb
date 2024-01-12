import React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from "axios";

interface Cosecha {
  id: number;
  cod_cosecha: number;
  fecha_cosecha: string;
  produc_cosecha: number;
  estado_cosecha: string;
  cod_lote: number;
}

type Props = {
  columns: GridColDef[];
  rows: Cosecha[];
  setLotes: React.Dispatch<React.SetStateAction<Cosecha[]>>;
};

const DataTableC: React.FC<Props> = (props) => {
  const { columns, rows, setLotes } = props;

  const handleDelete = (id: number) => {
    axios
      .delete(`http://104.248.120.74/8sb/api/Cosecha.php?id=${id}&action=delete`)
      .then((response) => {
        console.log("Respuesta de la API:", response.data);

        // Lógica adicional después de eliminar, si es necesario
        console.log("Cosecha eliminada correctamente");

        // Actualiza la lista de cosechas, puedes hacer otra solicitud GET o actualizar el estado directamente
        axios
          .get("http://104.248.120.74/8sb/api/Cosecha.php")
          .then((response) => {
            const cosechasWithId: Cosecha[] = response.data.map(
              (cosecha: Cosecha) => ({
                ...cosecha,
                id: cosecha.cod_cosecha,
              })
            );
            setLotes(cosechasWithId);
          })
          .catch((error) =>
            console.error("Error al obtener datos de cosechas:", error)
          );
      })
      .catch((error) => {
        console.error("Error al eliminar cosecha:", error);
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
          <Link to={`/cosecha/${params.row.id}`}>
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

export default DataTableC;
