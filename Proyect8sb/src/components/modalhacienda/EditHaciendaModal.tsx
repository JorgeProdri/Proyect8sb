// EditHaciendaModal.tsx

import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface EditHaciendaModalProps {
  open: boolean;
  handleClose: () => void;
  handleEditHacienda: (id: number, data: { nomb_hacienda: string, direccion_hacienda: string, contac_hacienda: number }) => void;
  haciendaData: {
    cod_hacienda: number;
    nomb_hacienda: string;
    direccion_hacienda: string;
    contac_hacienda: number;
  };
}

const EditHaciendaModal: React.FC<EditHaciendaModalProps> = ({ open, handleClose, handleEditHacienda, haciendaData }) => {
  const [editedHaciendaData, setEditedHaciendaData] = useState({
    nomb_hacienda: haciendaData.nomb_hacienda,
    direccion_hacienda: haciendaData.direccion_hacienda,
    contac_hacienda: haciendaData.contac_hacienda,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedHaciendaData({
      ...editedHaciendaData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    if (editedHaciendaData.nomb_hacienda && editedHaciendaData.direccion_hacienda && editedHaciendaData.contac_hacienda) {
      handleEditHacienda(haciendaData.cod_hacienda, editedHaciendaData);
      setEditedHaciendaData({
        nomb_hacienda: "",
        direccion_hacienda: "",
        contac_hacienda: 0,
      });
      handleClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 8,
        textAlign: "center",
      }}>
        <h2 style={{ marginBottom: 20 }}>Editar Hacienda</h2>
        <TextField label="Nombre" name="nomb_hacienda" value={editedHaciendaData.nomb_hacienda} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Dirección" name="direccion_hacienda" value={editedHaciendaData.direccion_hacienda} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Contacto" name="contac_hacienda" type="number" value={editedHaciendaData.contac_hacienda} onChange={handleChange} fullWidth margin="normal" />
        <Button variant="contained" onClick={handleEdit} style={{ marginTop: 20, backgroundColor: "blue", color: "white", borderRadius: 20 }}>Editar</Button>
      </Box>
    </Modal>
  );
};

export default EditHaciendaModal;
