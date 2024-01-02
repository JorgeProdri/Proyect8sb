import React, { useState } from "react";
import "./addfinca.scss";
import { GridColDef } from "@mui/x-data-grid";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Addfinca = (props: Props) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar si algún campo está vacío
    const isEmptyField = Object.values(formValues).some((value) => !value.trim());

    if (isEmptyField) {
      alert("Por favor, completa todos los campos antes de enviar.");
    } else {
      // Realizar la lógica de envío del formulario aquí
      props.setOpen(false);
    }
  };

  return (
    <div className="adfinca">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Añadir nueva {props.slug}</h1>
        <div className="logo">
          <img src="logoC.svg" alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map(({ field, type, headerName }) => (
              <div className="item" key={field}>
                <label>{headerName}</label>
                <input
                  type={type}
                  placeholder={field}
                  name={field} // Añade el atributo name para identificar el campo
                  onChange={handleChange} // Manejar cambios en el valor del campo
                  required // Campo obligatorio
                />
              </div>
            ))}
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Addfinca;
