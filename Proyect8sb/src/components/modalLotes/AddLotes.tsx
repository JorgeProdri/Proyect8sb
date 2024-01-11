import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import "./addlote.scss"; // Asegúrate de importar el archivo de estilos si es necesario

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

  const [haciendas, setHaciendas] = useState([]); // Agrega el estado para almacenar las haciendas

  // Recupera las haciendas al montar el componente
  React.useEffect(() => {
    axios.get("http://104.248.120.74/8sb/api/Hacienda.php")
      .then(response => {
        setHaciendas(response.data);
      })
      .catch(error => {
        console.error("Error al obtener datos de hacienda:", error);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    const { name, value } = e.target;
    setLoteData({
      ...loteData,
      [name as string]: value,
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
         width: "90%", // Ancho del 90% para pantallas pequeñas
         maxWidth: "500px", // Ancho máximo de 500px
         height: "70vh", // Usando 70% del alto de la pantalla
         overflowY: "auto", // Agregar desplazamiento vertical si el contenido es más grande
         bgcolor: "background.paper",
         boxShadow: 24,
         p: 4,
         borderRadius: 2,
         textAlign: "center",
      
      }}>
        <h2 style={{ marginBottom: 20 }}>Agregar Lote</h2>
        <TextField label="Nombre del Lote" name="nomb_lote" value={loteData.nomb_lote} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Dimensión x del Lote" name="dimenx_lote" value={loteData.dimenx_lote} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Dimensión y del Lote" name="dimeny_lote" value={loteData.dimeny_lote} onChange={handleChange} fullWidth margin="normal" />
        <p style={{ textAlign: "left", marginBottom: 5 }}>Seleccionar el estado del Lote:</p>
        <Select
          label="Estado del Lote"
          name="estado_lote"
          value={loteData.estado_lote}
          onChange={(e) => handleChange(e as React.ChangeEvent<{ name?: string | undefined; value: unknown }>)}
          className="custom-select"
        >
          <MenuItem value="Activo">Activo</MenuItem>
          <MenuItem value="Inactivo">Inactivo</MenuItem>
        </Select>
        <p style={{ textAlign: "left", marginBottom: 5 }}>Seleccionar la hacienda:</p>
        <Select
          label="Código de Hacienda"
          name="cod_hacienda"
          value={loteData.cod_hacienda}
          onChange={(e) => handleChange(e as React.ChangeEvent<{ name?: string | undefined; value: unknown }>)}
          className="custom-select"
        >
          {haciendas.map((hacienda: any) => (
            <MenuItem key={hacienda.cod_hacienda} value={hacienda.cod_hacienda}>
              {hacienda.nomb_hacienda}
            </MenuItem>
          ))}
        </Select>
        <p style={{ textAlign: "left", marginBottom: 5 }}>Aegurar de rellenar todos los datos:</p>
        <Button variant="contained" onClick={handleAdd} style={{   marginTop: 40, 
        backgroundColor: "green",
        color: "white",
        borderRadius: 20,}}>Agregar</Button>
      </Box>
    </Modal>
  );
};

export default AddLotes;
