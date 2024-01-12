import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import "./addusuarios.scss"; // Asegúrate de importar el archivo de estilos si es necesario

interface AddUsuariosModalProps {
  open: boolean;
  handleClose: () => void;
  handleAddUser: (data: {
    nomb_usuario: string;
    ape_usuario: string;
    user_usuario: string;
    pass_usuario: string;
    telefono_usuario: string;
    estado_usuario: string;
    cod_hacienda: string;
  }) => void;
}

const AddUsuarios: React.FC<AddUsuariosModalProps> = ({ open, handleClose, handleAddUser }) => {
  const [usuarioData, setUsuarioData] = useState({
    nomb_usuario: "",
    ape_usuario: "",
    user_usuario: "",
    pass_usuario: "",
    telefono_usuario: "",
    estado_usuario: "",
    cod_hacienda: "",
  });

  const [haciendas, setHaciendas] = useState([]);

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
    setUsuarioData({
      ...usuarioData,
      [name as string]: value,
    });
  };

  const handleAdd = () => {
    if (
      usuarioData.nomb_usuario &&
      usuarioData.ape_usuario &&
      usuarioData.user_usuario &&
      usuarioData.pass_usuario &&
      usuarioData.telefono_usuario &&
      usuarioData.estado_usuario &&
      usuarioData.cod_hacienda
    ) {
      handleAddUser(usuarioData);
      setUsuarioData({
        nomb_usuario: "",
        ape_usuario: "",
        user_usuario: "",
        pass_usuario: "",
        telefono_usuario: "",
        estado_usuario: "",
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
      <Box
        sx={{
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
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Agregar Usuario</h2>
        <TextField
          label="Nombre del Usuario"
          name="nomb_usuario"
          value={usuarioData.nomb_usuario}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Apellido del Usuario"
          name="ape_usuario"
          value={usuarioData.ape_usuario}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Usuario"
          name="user_usuario"
          value={usuarioData.user_usuario}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contraseña"
          name="pass_usuario"
          type="password"
          value={usuarioData.pass_usuario}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Teléfono del Usuario"
          name="telefono_usuario"
          value={usuarioData.telefono_usuario}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <p style={{ textAlign: "left", marginBottom: 5 }}>
          Seleccionar el estado del Usuario:
        </p>
        <Select
          label="Estado del Usuario"
          name="estado_usuario"
          value={usuarioData.estado_usuario}
          onChange={(e) =>
            handleChange(e as React.ChangeEvent<{ name?: string | undefined; value: unknown }>)
          }
          className="custom-select"
        >
          <MenuItem value="Activo">Activo</MenuItem>
          <MenuItem value="Inactivo">Inactivo</MenuItem>
        </Select>
        <p style={{ textAlign: "left", marginBottom: 5 }}>
          Seleccionar la hacienda:
        </p>
        <Select
          label="Código de Hacienda"
          name="cod_hacienda"
          value={usuarioData.cod_hacienda}
          onChange={(e) =>
            handleChange(e as React.ChangeEvent<{ name?: string | undefined; value: unknown }>)
          }
          className="custom-select"
        >
          {haciendas.map((hacienda: any) => (
            <MenuItem key={hacienda.cod_hacienda} value={hacienda.cod_hacienda}>
              {hacienda.nomb_hacienda}
            </MenuItem>
          ))}
        </Select>
        <p style={{ textAlign: "left", marginBottom: 5 }}>
          Asegurar de rellenar todos los datos:
        </p>
        <Button
          variant="contained"
          onClick={handleAdd}
          style={{
            marginTop: 40,
            backgroundColor: "green",
            color: "white",
            borderRadius: 20,
          }}
        >
          Agregar
        </Button>
      </Box>
    </Modal>
  );
};

export default AddUsuarios;
