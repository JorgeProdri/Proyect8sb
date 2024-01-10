// Single.tsx
import "./single.scss";
import imagenHacienda from './HaciendaVictoria.jpg';

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
         
          </div>
          <div className="activities">
            <div className="titulo2">
              <h2>Acerca de Nosotros</h2>
            </div>       
            <p>
              Hacienda Victoria es una finca de una sola propiedad establecida en 2011 y ubicada en Cerecita, Guayas,
              cerca de la costa del Pacífico de Ecuador. Estamos escondidos entre las suaves y exuberantes colinas de la
              región. Lo que antes era un bosque tropical seco ahora es una tierra abundante, verde y fértil.
            </p>
          </div>
        </div>
        <div className="image">
          <img src={imagenHacienda} alt="Hacienda Victoria" />
          <span>Hacienda Victoria</span>
        </div>
      </div>
    </div>
  );
};

export default Single;

