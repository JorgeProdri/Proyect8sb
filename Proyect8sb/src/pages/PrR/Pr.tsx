
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from 'recharts';

const Pr = () => {
  // Datos de ejemplo para el gráfico de barras horizontales con scrollbar
  const data = [
    { mes: 'Enero', precipitacion: 30 },
    { mes: 'Febrero', precipitacion: 45 },
    { mes: 'Marzo', precipitacion: 20 },
    { mes: 'Abril', precipitacion: 60 },
    { mes: 'Mayo', precipitacion: 15 },
    // Agrega más datos según sea necesario
  ];

  return (
    <div>
      <div>Gráfico de Precipitación con Scrollbar</div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <XAxis dataKey="mes" />
          <YAxis type="number" />
          <Tooltip />
          <Bar dataKey="precipitacion" fill="#82ca9d" />
          <Brush dataKey="mes" height={30} stroke="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Pr;
