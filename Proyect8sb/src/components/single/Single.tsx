
import "./single.scss";

const Single = () => {
  return (
    <div className="container2">
      <div className="single">
        <div className="view">
          <div className="hacienda-info">
            <h2>Informacion de la hacienda</h2>
            <div>
              <strong>Ubicación:</strong> Cerecita, Guayas, Ecuador
            </div>
            <div>
              <strong>Correo electrónico:</strong> haciendavictoriaecuador@gmail.com
            </div>
            <div>
              <strong>Número Telefónico:</strong> Disponible en WhatsApp: +593 993273637
            </div>
          </div>
          <div className="activities">
            <h2>Acerca de Nosotros</h2>
            <p>
              Hacienda Victoria es una finca de una sola propiedad establecida en 2011 y ubicada en Cerecita, Guayas,
              cerca de la costa del Pacífico de Ecuador. Estamos escondidos entre las suaves y exuberantes colinas de la
              región. Lo que antes era un bosque tropical seco ahora es una tierra abundante, verde y fértil.
            </p>
          </div>
        </div>
        <div className="image">
          <img src="cacao.svg" alt="" />      
        </div>
      </div>
    </div>
  );
};

export default Single;
