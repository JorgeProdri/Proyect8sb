import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface AddHaciendaModalProps {
  open: boolean;
  handleClose: () => void;
  handleAddHacienda: (data: { nomb_hacienda: string, direccion_hacienda: string, contac_hacienda: number }) => void;
}

const Edithacienda: React.FC<AddHaciendaModalProps> = ({ open, handleClose, handleAddHacienda }) => {
  const [haciendaData, setHaciendaData] = useState({
    nomb_hacienda: "",
    direccion_hacienda: "",
    contac_hacienda: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHaciendaData({
      ...haciendaData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    // Validar y enviar los datos
    if (haciendaData.nomb_hacienda && haciendaData.direccion_hacienda && haciendaData.contac_hacienda) {
      console.log("Enviando datos a la API:", haciendaData);

      handleAddHacienda(haciendaData);
      setHaciendaData({
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
        borderRadius: 8, // Agregamos un borde redondeado
        textAlign: "center", // Alineamos el contenido al centro
      }}>
        <h2 style={{ marginBottom: 20 }}>Agregar Hacienda</h2>
        <TextField label="Nombre" name="nomb_hacienda" value={haciendaData.nomb_hacienda} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Dirección" name="direccion_hacienda" value={haciendaData.direccion_hacienda} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Contacto" name="contac_hacienda" type="number" value={haciendaData.contac_hacienda} onChange={handleChange} fullWidth margin="normal" />
        <Button variant="contained" onClick={handleAdd} style={{ marginTop: 20, backgroundColor: "green", color: "white", borderRadius: 20 }}>Agregar</Button>
      </Box>
    </Modal>
  );
};

export default Edithacienda;