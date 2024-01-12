import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import "./addcosecha.scss"; // Asegúrate de importar el archivo de estilos si es necesario

interface AddCosechaModalProps {
  open: boolean;
  handleClose: () => void;
  handleAddCosecha: (data: { fecha_cosecha: string, produc_cosecha: string, estado_cosecha: string, cod_lote: string }) => void;
}

const AddCosecha: React.FC<AddCosechaModalProps> = ({ open, handleClose, handleAddCosecha }) => {
  const [cosechaData, setCosechaData] = useState({
    fecha_cosecha: "", // Cambiado a cadena de texto
    produc_cosecha: "",
    estado_cosecha: "",
    cod_lote: "",
  });

  const [lotes, setLotes] = useState([]); // Estado para almacenar los lotes

  // Recupera los lotes al montar el componente
  useEffect(() => {
    axios.get("http://104.248.120.74/8sb/api/Lote.php")
      .then(response => {
        setLotes(response.data);
      })
      .catch(error => {
        console.error("Error al obtener datos de lotes:", error);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    const { name, value } = e.target;
    setCosechaData({
      ...cosechaData,
      [name as string]: value,
    });
  };

  const handleAdd = () => {
    // Validar y enviar los datos
    if (cosechaData.fecha_cosecha && cosechaData.produc_cosecha && cosechaData.estado_cosecha && cosechaData.cod_lote) {
      // Convertir la cadena de fecha a un objeto Date
      const fechaCosechaDate = new Date(cosechaData.fecha_cosecha);
      const formattedFechaCosecha = fechaCosechaDate.toISOString(); // Formato estándar ISO

      const dataToSend = {
        ...cosechaData,
        fecha_cosecha: formattedFechaCosecha,
      };

      console.log("Enviando datos a la API:", dataToSend);
      handleAddCosecha(dataToSend);

      setCosechaData({
        fecha_cosecha: "",
        produc_cosecha: "",
        estado_cosecha: "",
        cod_lote: "",
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
        <h2 style={{ marginBottom: 20 }}>Agregar Cosecha</h2>
        <TextField
          name="fecha_cosecha"
          type="date" 
          value={cosechaData.fecha_cosecha}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Producción de Cosecha"
          name="produc_cosecha"
          value={cosechaData.produc_cosecha}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <p style={{ textAlign: "left", marginBottom: 5 }}>Seleccionar el estado de la Cosecha:</p>
        <Select
          label="Estado de la Cosecha"
          name="estado_cosecha"
          value={cosechaData.estado_cosecha}
          onChange={(e) => handleChange(e as React.ChangeEvent<{ name?: string | undefined; value: unknown }>)}
          className="custom-select"
        >
          <MenuItem value="Activo">Activo</MenuItem>
          <MenuItem value="Inactivo">Inactivo</MenuItem>
        </Select>
        <p style={{ textAlign: "left", marginBottom: 5 }}>Seleccionar el lote de la Cosecha:</p>
        <Select
          label="Código de Lote"
          name="cod_lote"
          value={cosechaData.cod_lote}
          onChange={(e) => handleChange(e as React.ChangeEvent<{ name?: string | undefined; value: unknown }>)}
          className="custom-select"
        >
          {lotes.map((lote: any) => (
            <MenuItem key={lote.cod_lote} value={lote.cod_lote}>
              {lote.nomb_lote}
            </MenuItem>
          ))}
        </Select>
        <p style={{ textAlign: "left", marginBottom: 5 }}>Asegúrate de rellenar todos los datos:</p>
        <Button variant="contained" onClick={handleAdd} style={{
          marginTop: 40,
          backgroundColor: "green",
          color: "white",
          borderRadius: 20,
        }}>Agregar</Button>
      </Box>
    </Modal>
  );
};

export default AddCosecha;
