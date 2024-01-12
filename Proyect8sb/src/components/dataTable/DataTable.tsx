import React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from "axios";

interface Usuario {
  id: number;
  cod_usuario: number;
  nomb_usuario: string;
  ape_usuario: string;
  user_usuario: string;
  pass_usuario: string;
  telefono_usuario: string;
  estado_usuario: string;
  cod_hacienda: number;
}

type Props = {
  columns: GridColDef[];
  rows: Usuario[];
  slug: string;
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>;
};

const DataTable: React.FC<Props> = (props) => {
  const { columns, rows, slug, setUsuarios } = props;

  const handleDelete = (id: number) => {
    axios.delete(`http://104.248.120.74/8sb/api/user.php?id=${id}&action=delete`)
      .then(response => {
        console.log("Respuesta de la API:", response.data);

        console.log("Usuario eliminado correctamente");

        axios.get("http://104.248.120.74/8sb/api/user.php")
          .then(response => {
            const usuariosWithId: Usuario[] = response.data.map((usuario: Usuario) => ({
              ...usuario,
              id: usuario.cod_usuario,
            }));
            setUsuarios(usuariosWithId);
          })
          .catch(error => console.error("Error al obtener datos de usuarios:", error));
      })
      .catch(error => {
        console.error("Error al eliminar usuario:", error);
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

export default DataTable;
