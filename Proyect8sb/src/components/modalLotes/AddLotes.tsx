import React, { useState } from "react";
import "./addlote.scss"; // Asegúrate de tener este archivo de estilos
import { GridColDef } from "@mui/x-data-grid";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddLotes = (props: Props) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="addlote">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Añadir nuevo {props.slug}</h1>
        <div className="logo">
          {/* Coloca aquí el logo específico para Lote */}
          <img src="logoLote.svg" alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map(({ field, type, headerName }) => (
              <div className={`item ${field === "codigo" ? "hidden" : ""}`} key={field}>
                <label>{headerName}</label>
                <input
                  type={type}
                  placeholder={field}
                  name={field}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default AddLotes;
