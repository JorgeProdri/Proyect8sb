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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmptyField = Object.values(formValues).some((value) => !value.trim());

    if (isEmptyField) {
      alert("Por favor, completa todos los campos antes de enviar.");
    } else {
      try {
        // Realizar la solicitud POST a la API
        const response = await fetch("https://simulacion7sb.000webhostapp.com/8SB/hacienda.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "create",  // Ajusta esto según la lógica de tu API
            data: formValues,
          }),
        });

        if (response.ok) {
          console.log("Hacienda creada correctamente");
        } else {
          console.error("Error al crear hacienda:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }

      // Cerrar el modal después de la creación exitosa
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

export default Addfinca;
