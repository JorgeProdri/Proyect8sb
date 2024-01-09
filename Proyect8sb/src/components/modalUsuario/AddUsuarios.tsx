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
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [haciendas, setHaciendas] = useState<Hacienda[]>([]);

  useEffect(() => {
    // Hacer la solicitud a la API para obtener los códigos de hacienda
    axios.get("https://simulacion7sb.000webhostapp.com/8SB/hacienda.php")
      .then(response => setHaciendas(response.data))
      .catch(error => console.error("Error al obtener códigos de hacienda:", error));
  }, []); // Se ejecutará solo una vez al montar el componente

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmptyField = Object.values(formValues).some((value) => !value.trim());

    if (isEmptyField) {
      alert("Por favor, completa todos los campos antes de enviar.");
    } else {
      props.setOpen(false);
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
          <div className="item" key="cod_usuario">
            <label>Código de Usuario</label>
            <input
              type="text"
              placeholder="Código de Usuario"
              name="cod_usuario"
              onChange={handleChange}
              required
            />
          </div>

          <div className="item" key="nomb_usuario">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              name="nomb_usuario"
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
              onChange={handleChange}
              required
            />
          </div>

          <div className="item" key="telefono_usuario">
            <label>Teléfono</label>
            <input
              type="text"
              placeholder="Teléfono"
              name="telefono_usuario"
              onChange={handleChange}
              required
            />
          </div>

          <div className="item" key="estado_usuario">
            <label>Estado</label>
            <select
              name="estado_usuario"
              onChange={handleChange}
              value={formValues["estado_usuario"] || ""}
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
              onChange={handleChange}
              value={formValues["cod_hacienda"] || ""}
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
