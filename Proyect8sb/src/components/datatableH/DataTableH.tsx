// DataTableH.tsx

import React, { useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import EditHaciendaModal from "../modalhacienda/EditHaciendaModal";
import axios from "axios";

interface Hacienda {
  cod_hacienda: number;
  nomb_hacienda: string;
  direccion_hacienda: string;
  contac_hacienda: number;
}

type Props = {
  columns: GridColDef[];
  rows: Hacienda[];
  slug: string;
  setHaciendas: React.Dispatch<React.SetStateAction<Hacienda[]>>;
};

const DataTableH: React.FC<Props> = (props) => {
  const { columns, rows,setHaciendas } = props;
  const [selectedHacienda, setSelectedHacienda] = useState<Hacienda | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEditModalOpen = (hacienda: Hacienda) => {
    setSelectedHacienda(hacienda);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setSelectedHacienda(null);
    setEditModalOpen(false);
  };

  const handleEditHacienda = (id: number, data: { nomb_hacienda: string, direccion_hacienda: string, contac_hacienda: number }) => {
    axios.post("http://104.248.120.74/8sb/api/Hacienda.php", {
      action: "update",
      cod_hacienda: id,
      ...data,
    })
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
      console.error("Error al actualizar hacienda:", error);
      // Maneja el error según tus necesidades
    });

    handleEditModalClose();
  };

  const handleDelete = (id: number) => {
    axios.post(`http://104.248.120.74/8sb/api/Hacienda.php?id=${id}&action=delete`)
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
        console.error("Error al eliminar hacienda:", error);
        // Maneja el error según tus necesidades
      });
  };

  const editColumn: GridColDef = {
    field: "edit",
    headerName: "Edit",
    width: 100,
    renderCell: (params) => (
      <div className="action">
        <div className="edit" onClick={() => handleEditModalOpen(params.row)}>
          <img className="edit-icon" src="/view.svg" alt="Edit" />
        </div>
      </div>
    ),
  };

  const deleteColumn: GridColDef = {
    field: "delete",
    headerName: "Delete",
    width: 100,
    renderCell: (params) => (
      <div className="action">
        <div className="delete" onClick={() => handleDelete(params.row.cod_hacienda)}>
          <img className="delete-icon" src="/delete.svg" alt="Delete" />
        </div>
      </div>
    ),
  };

  return (
    <div className="dataTable">
      <DataGrid
        rows={rows}
        columns={[...columns, editColumn, deleteColumn]}
        components={{ Toolbar: GridToolbar }}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        pageSizeOptions={[5]} // Establece la cantidad predeterminada de filas por página
      />
      <EditHaciendaModal
        open={editModalOpen}
        handleClose={handleEditModalClose}
        handleEditHacienda={handleEditHacienda}
        haciendaData={selectedHacienda || { cod_hacienda: 0, nomb_hacienda: "", direccion_hacienda: "", contac_hacienda: 0 }}
      />
    </div>
  );
};

export default DataTableH;
