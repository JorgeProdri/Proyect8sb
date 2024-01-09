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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setError("Por favor, completa todos los campos antes de enviar.");
    } else {
      setLoading(true);

      try {
        const response = await fetch("https://simulacion7sb.000webhostapp.com/8SB/hacienda.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "create",
            data: formValues,
          }),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Hacienda creada correctamente");
          console.log("Código de la nueva hacienda:", responseData.codigo);
          // Puedes mostrar un mensaje de éxito al usuario si lo deseas
        } else {
          const errorData = await response.json();
          setError(`Error al crear hacienda: ${errorData.message}`);
        }
      } catch (error) {
        setError("Error en la solicitud. Por favor, intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
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
            .filter((item) => item.field !== "id")
            .map(({ field, type, headerName }) => (
              <div className="item" key={field}>
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
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addfinca;
