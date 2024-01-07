import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { userRows } from "../../data";


const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "Cedula",
    type: "string",
    headerName: "Cedula",
    width: 100,
  },
  {
    field: "Nombre",
    type: "string",
    headerName: "Nombre",
    width: 130,
  },
  {
    field: "Apellido",
    type: "string",
    headerName: "Apellido",
    width: 130,
  },
  {
    field: "Usuario",
    type: "string",
    headerName: "Usuario",
    width: 100,
  },
  {
    field: "Contraseña",
    type: "string",
    headerName: "Contraseña",
    width: 100,
  },
  {
    field: "Telefono",
    type: "string",
    headerName: "Telefono",
    width: 100,
  },
  {
    field: "Estado",
    type: "string",
    headerName: "Estado",
    width: 100,
  },

];

const Users = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allusers"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/users").then(
  //       (res) => res.json()
  //     ),
  // });

  return (
    <div className="users">
      <div className="info">
        <h1>Usuarios</h1>
        <button onClick={() => setOpen(true)}>Añadir Usuario</button>
      </div>
      <DataTable slug="users" columns={columns} rows={userRows} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
