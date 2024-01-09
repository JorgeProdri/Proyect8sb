import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import AddUsuarios from "../../components/modalUsuario/AddUsuarios";
import axios from "axios";

interface User { 
  cod_usuario: number;
  nomb_usuario: string;
  ape_usuario: string;
  user_usuario: string;
  telefono_usuario: string;
  estado_usuario: string;
  cod_hacienda: number;
}

const Users = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Hacer la solicitud a la API para obtener los usuarios
    axios.get("https://simulacion7sb.000webhostapp.com/8SB/user.php")
      .then(response => {
        // Asigna un 'id' único basado en 'cod_usuario' a cada usuario
        const usersWithIds = response.data.map((user: User, index: number) => ({
          ...user,
          id: index + 1, // Puedes ajustar esto según tu lógica de generación de 'id'
        }));
        setUsers(usersWithIds);
      })
      .catch(error => console.error("Error al obtener usuarios:", error));
  }, []); // Se ejecutará solo una vez al montar el componente

  const handleDelete = (userId: number) => {
    // Agrega la lógica para eliminar un usuario aquí
    console.log(`Eliminar usuario con ID: ${userId}`);
  };

  const columns: GridColDef[] = [
    { field: "cod_usuario", headerName: "Código de Usuario", width: 150 },
    { field: "nomb_usuario", headerName: "Nombre", width: 130 },
    { field: "ape_usuario", headerName: "Apellido", width: 130 },
    { field: "user_usuario", headerName: "Usuario", width: 100 },
    { field: "telefono_usuario", headerName: "Teléfono", width: 130 },
    { field: "estado_usuario", headerName: "Estado", width: 100 },
    { field: "cod_hacienda", headerName: "Hacienda", width: 100 },
  ];

  return (
    <div className="users">
      <div className="info">
        <h1>Usuarios</h1>
        <button onClick={() => setOpen(true)}>Añadir Usuario</button>
      </div>

      {/* Utiliza el estado 'users' obtenido de la API */}
      <DataTable
        slug="users"
        columns={columns}
        rows={users}
        onDelete={handleDelete} // Asegúrate de pasar la función onDelete si es necesario
      />

      {open && <AddUsuarios slug="ususario" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
