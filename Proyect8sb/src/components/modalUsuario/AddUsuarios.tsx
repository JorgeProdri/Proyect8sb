import React, { useState } from "react";
import "./addusuarios.scss";
import { GridColDef } from "@mui/x-data-grid";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddUsuarios = (props: Props) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

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
          {props.columns
            .filter((item) => item.field !== "action") // Excluir la columna de acción
            .map(({ field, type, headerName }) => (
              <div className={`item ${field === "codigo" ? "hidden" : ""}`} key={field}>
                <label>{headerName}</label>
                {field === "Contraseña" ? (
                  <input
                    type="password"
                    placeholder={field}
                    name={field}
                    onChange={handleChange}
                    required
                  />
                ) : field === "Estado" ? (
                  <select
                    name={field}
                    onChange={handleChange}
                    value={formValues[field] || ""}
                    required
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                ) : (
                  <input
                    type={type}
                    placeholder={field}
                    name={field}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            ))}
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default AddUsuarios;
