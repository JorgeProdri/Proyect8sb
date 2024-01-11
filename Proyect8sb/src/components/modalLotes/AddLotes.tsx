import React, { useState, useEffect } from "react";
import "./addlote.scss"; // Asegúrate de tener este archivo de estilos
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddLotes = (props: Props) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    estado_lote: "activo", // Establecer el estado_lote por defecto como "activo"
  });
  const [haciendas, setHaciendas] = useState<{ id: number; codigo: string }[]>([]);

  useEffect(() => {
    // Obtener datos de haciendas al montar el componente
    axios.get("https://simulacion7sb.000webhostapp.com/8SB/hacienda.php")
      .then((response) => {
        setHaciendas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de haciendas:", error);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        // Enviar datos a la API
        await axios.post("https://simulacion7sb.000webhostapp.com/8SB/lote.php", formValues);

        // Cerrar el modal después de enviar datos
        props.setOpen(false);
      } catch (error) {
        console.error("Error al enviar datos a la API:", error);
        // Puedes manejar el error de la manera que consideres apropiada
        alert("Error al enviar datos. Por favor, intenta de nuevo.");
      }
    }
  };

  return (
    <div className="addlote">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Añadir nuevo {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img" && item.field !== "cod_lote")
            .map(({ field, type, headerName }) => (
              <div className={`item ${field === "codigo" ? "hidden" : ""}`} key={field}>
                <label>{headerName}</label>
                {field === "cod_hacienda" ? (
                  <select name={field} onChange={handleChange} required>
                    <option value="">Seleccionar Hacienda</option>
                    {haciendas.map((hacienda) => (
                      <option key={hacienda.id} value={hacienda.codigo}>
                        {hacienda.codigo}
                      </option>
                    ))}
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

export default AddLotes;
