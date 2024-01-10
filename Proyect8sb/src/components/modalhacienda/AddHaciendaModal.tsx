import React, { useState } from "react";
import axios from "axios";
import "./addhacienda.scss";

interface Hacienda {
  nomb_hacienda: string;
  direccion_hacienda: string;
  contac_hacienda: string;
}

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateHaciendas: () => void;
}

const AddHaciendaModal: React.FC<Props> = ({ setOpen, updateHaciendas }) => {
  const [formValues, setFormValues] = useState<Hacienda>({
    nomb_hacienda: "",
    direccion_hacienda: "",
    contac_hacienda: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://simulacion7sb.000webhostapp.com/8SB/hacienda.php",
        {
          nomb_hacienda: formValues.nomb_hacienda,
          direccion_hacienda: formValues.direccion_hacienda,
          contac_hacienda: formValues.contac_hacienda
        },
        {
          httpAgent: {
            protocol: 'http:',
          },
        }
      );

      console.log("Datos guardados exitosamente:", response.data);
      updateHaciendas();
      setOpen(false);
    } catch (error: any) {
      console.error("Error al guardar datos de la hacienda:", error);
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
        console.error("Código de estado:", error.response.status);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor");
      } else {
        console.error("Error durante la solicitud:", error.message);
      }
    }
  };


  return (
    <div className="add-hacienda-modal">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Añadir nueva Hacienda</h1>
        <form onSubmit={handleSubmit}>
          <div className="item" key="nomb_hacienda">
            <label>Nombre de la Hacienda</label>
            <input
              type="text"
              placeholder="Nombre de la Hacienda"
              name="nomb_hacienda"
              onChange={handleChange}
              required
            />
          </div>

          <div className="item" key="direccion_hacienda">
            <label>Dirección de la Hacienda</label>
            <input
              type="text"
              placeholder="Dirección de la Hacienda"
              name="direccion_hacienda"
              onChange={handleChange}
              required
            />
          </div>

          <div className="item" key="contac_hacienda">
            <label>Contacto de la Hacienda</label>
            <input
              type="text"
              placeholder="Contacto de la Hacienda"
              name="contac_hacienda"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default AddHaciendaModal;
