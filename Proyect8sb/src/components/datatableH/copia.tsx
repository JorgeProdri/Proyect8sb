import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTableh.scss";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";

type Hacienda = {
  cod_hacienda: number;
  nomb_hacienda: string;
  direccion_hacienda: string;
  contac_hacienda: number;
};

type Props = {
  columns: GridColDef[];
  rows: Hacienda[];
  slug: string;
};

const DataTableH = (props: Props) => {
  const handleDelete = async (id: number) => {
    console.log(`Hacienda con ID ${id} eliminada correctamente.`);
    try {
      const response = await axios.delete(`https://simulacion7sb.000webhostapp.com/8SB/hacienda.php`, {
        data: {
          cod_hacienda: id,
        },
      });

      if (response.data.success) {
        console.log(`Hacienda con ID ${id} eliminada correctamente.`);

        // Actualiza tus datos después de la eliminación (si es necesario)
        const updatedRows = props.rows.filter(row => row.cod_hacienda !== id);
        // Actualiza el estado, el estado de Redux, o realiza cualquier acción necesaria
      } else {
        console.error(`Error al eliminar hacienda: ${response.data.message}`);
      }
    } catch (error: AxiosError | any) {
      if (axios.isAxiosError(error)) {
        console.error('Error en la solicitud de eliminación:', error.message);
      } else {
        console.error('Error en la solicitud de eliminación:', error);
      }
    }
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.cod_hacienda}`}>
            <img src="/view.svg" alt="" />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.cod_hacienda)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
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
