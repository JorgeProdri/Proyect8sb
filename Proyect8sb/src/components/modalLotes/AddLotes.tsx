import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface AddLotesModalProps {
  open: boolean;
  handleClose: () => void;
  handleAddLotes: (data: { nomb_lote: string, dimenx_lote: string, dimeny_lote: string, estado_lote: string, cod_hacienda: string }) => void;
}

const AddLotes: React.FC<AddLotesModalProps> = ({ open, handleClose, handleAddLotes }) => {
  const [loteData, setLoteData] = useState({
    nomb_lote: "",
    dimenx_lote: "",
    dimeny_lote: "",
    estado_lote: "",
    cod_hacienda: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoteData({
      ...loteData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    // Validar y enviar los datos
    if (loteData.nomb_lote && loteData.dimenx_lote && loteData.dimeny_lote && loteData.estado_lote && loteData.cod_hacienda) {
      console.log("Enviando datos a la API:", loteData);

      handleAddLotes(loteData);
      setLoteData({
        nomb_lote: "",
        dimenx_lote: "",
        dimeny_lote: "",
        estado_lote: "",
        cod_hacienda: "",
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
        <h2 style={{ marginBottom: 20 }}>Agregar Lote</h2>
        <TextField label="Nombre del Lote" name="nomb_lote" value={loteData.nomb_lote} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Dimensión x del Lote" name="dimenx_lote" value={loteData.dimenx_lote} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Dimensión y del Lote" name="dimeny_lote" value={loteData.dimeny_lote} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Estado del Lote" name="estado_lote" value={loteData.estado_lote} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Código de Hacienda" name="cod_hacienda" value={loteData.cod_hacienda} onChange={handleChange} fullWidth margin="normal" />
        <Button variant="contained" onClick={handleAdd} style={{ marginTop: 20, backgroundColor: "green", color: "white", borderRadius: 20 }}>Agregar</Button>
      </Box>
    </Modal>
  );
};

export default AddLotes;
