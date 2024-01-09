import React, { useState, useEffect } from "react";
import "./addusuarios.scss";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface Hacienda {
  cod_hacienda: number;
  // Otros campos de la hacienda según tu API
}

const AddUsuarios = (props: Props) => {
  const [nombUsuario, setNombUsuario] = useState("");
  const [apeUsuario, setApeUsuario] = useState("");
  const [userUsuario, setUserUsuario] = useState("");
  const [passUsuario, setPassUsuario] = useState("");
  const [telefonoUsuario, setTelefonoUsuario] = useState("");
  const [estadoUsuario, setEstadoUsuario] = useState("");
  const [codHacienda, setCodHacienda] = useState("");
  const [haciendas, setHaciendas] = useState<Hacienda[]>([]);

  useEffect(() => {
    // Hacer la solicitud a la API para obtener los códigos de hacienda
    axios.get("https://simulacion7sb.000webhostapp.com/8SB/hacienda.php")
      .then(response => setHaciendas(response.data))
      .catch(error => console.error("Error al obtener códigos de hacienda:", error));
  }, []); // Se ejecutará solo una vez al montar el componente

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    switch (e.target.name) {
      case "nomb_usuario":
        setNombUsuario(value);
        break;
      case "ape_usuario":
        setApeUsuario(value);
        break;
      case "user_usuario":
        setUserUsuario(value);
        break;
      case "pass_usuario":
        setPassUsuario(value);
        break;
      case "telefono_usuario":
        setTelefonoUsuario(value);
        break;
      case "estado_usuario":
        setEstadoUsuario(value);
        break;
      case "cod_hacienda":
        setCodHacienda(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmptyField = [nombUsuario, apeUsuario, userUsuario, passUsuario, telefonoUsuario, estadoUsuario, codHacienda].some(value => !value.trim());

    if (isEmptyField) {
      alert("Por favor, completa todos los campos antes de enviar.");
    } else {
      // Mostrar por consola todos los datos antes de enviar
      console.log("Datos a enviar:", { nombUsuario, apeUsuario, userUsuario, passUsuario, telefonoUsuario, estadoUsuario, codHacienda });

      // Realizar la solicitud POST para guardar los datos en la API
      axios.post("https://simulacion7sb.000webhostapp.com/8SB/user.php", {
        nomb_usuario: nombUsuario,
        ape_usuario: apeUsuario,
        user_usuario: userUsuario,
        pass_usuario: passUsuario,
        telefono_usuario: telefonoUsuario,
        estado_usuario: estadoUsuario,
        cod_hacienda: codHacienda,
      })
        .then(response => {
          console.log("Datos guardados exitosamente:", response.data);
          props.setOpen(false);
        })
        .catch(error => console.error("Error al guardar datos:", error));
    }
  };

  return (
    <div className="addusuarios">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Añadir nuevo {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          <div className="item" key="nomb_usuario">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              name="nomb_usuario"
              value={nombUsuario}
              onChange={handleChange}
              required
            />
          </div>

          <div className="item" key="ape_usuario">
            <label>Apellido</label>
            <input
              type="text"
              placeholder="Apellido"
              name="ape_usuario"
              value={apeUsuario}
              onChange={handleChange}
              required
            />
          </div>

          <div className="item" key="user_usuario">
            <label>Usuario</label>
            <input
              type="text"
              placeholder="Usuario"
              name="user_usuario"
              value={userUsuario}
              onChange={handleChange}
              required
            />
          </div>

          <div className="item" key="pass_usuario">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              name="pass_usuario"
              value={passUsuario}
              onChange={handleChange}
              required
            />
          </div>

          <div className="item" key="telefono_usuario">
            <label>Teléfono</label>
            <input
              type="int"
              placeholder="Teléfono"
              name="telefono_usuario"
              value={telefonoUsuario}
              onChange={handleChange}
              required
            />
          </div>

          <div className="item" key="estado_usuario">
            <label>Estado</label>
            <select
              name="estado_usuario"
              value={estadoUsuario}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Seleccione un estado
              </option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <div className="item" key="cod_hacienda">
            <label>Código de Hacienda</label>
            <select
              name="cod_hacienda"
              value={codHacienda}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Seleccione un código de hacienda
              </option>
              {haciendas.map((hacienda) => (
                <option key={hacienda.cod_hacienda} value={hacienda.cod_hacienda}>
                  {hacienda.cod_hacienda} {/* Puedes ajustar según la estructura de tu API */}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default AddUsuarios;
