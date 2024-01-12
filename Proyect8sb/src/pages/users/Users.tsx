import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss"; 
import AddUsuarios from "../../components/modalUsuario/AddUsuarios";
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
const columns: GridColDef[] = [
  {
    field: "cod_usuario",
    type: "number",
    width: 100,
  },
  {
    field: "nomb_usuario",
    type: "string",
    headerName: "Nombre",
    width: 120,
  },
  {
    field: "ape_usuario",
    type: "string",
    headerName: "Apellido",
    width: 120,
  },
  {
    field: "user_usuario",
    type: "string",
    headerName: "Usuario",
    width: 120,
  },
  {
    field: "telefono_usuario",
    type: "number",
    headerName: "Teléfono",
    width: 120,
  },
  {
    field: "estado_usuario",
    type: "string",
    headerName: "Estado",
    width: 100,
  },
  {
    field: "cod_hacienda",
    type: "number",
    headerName: "Código Hacienda",
    width: 150,
  },
];

const Users = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUsuariosData();
  }, []);

  const fetchUsuariosData = () => {
    axios.get("http://104.248.120.74/8sb/api/user.php")
      .then((response) => {
        const usuariosWithId: Usuario[] = response.data.map((usuario: Usuario) => ({
          ...usuario,
          id: usuario.cod_usuario,
        }));
        setUsuarios(usuariosWithId);
      })
      .catch((error) => {
        console.error("Error al obtener datos de usuarios:", error);
      });
  };

  const handleAddUser = (data: {
    nomb_usuario: string;
    ape_usuario: string;
    user_usuario: string;
    pass_usuario: string;
    telefono_usuario: string;
    estado_usuario: string;
    cod_hacienda: string;
  }) => {
    const dataWithAction = { ...data, action: 'create' };

    axios.post("http://104.248.120.74/8sb/api/user.php", dataWithAction)
      .then(response => {
        console.log("Respuesta de la API:", response.data);
        fetchUsuariosData();
      })
      .catch(error => {
        console.error("Error al enviar datos a la API:", error);
      });

    setOpen(false);
  };

  return (
    <div className="users">
      <h1>Usuarios</h1>
      <div className="button">
        <button onClick={() => setOpen(true)}>Agregar Usuario</button>
      </div>
      <AddUsuarios open={open} handleClose={() => setOpen(false)} handleAddUser={handleAddUser} />
      <DataTable columns={columns} rows={usuarios} slug="usuario" setUsuarios={setUsuarios} />
    </div>
  );
};

export default Users;
