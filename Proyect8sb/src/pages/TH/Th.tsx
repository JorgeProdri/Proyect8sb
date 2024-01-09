
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Th = () => {
  // Datos de ejemplo para los gráficos
  const data = [
    { name: 'Enero', temperatura: 20, humedad: 60 },
    { name: 'Febrero', temperatura: 25, humedad: 55 },
    { name: 'Marzo', temperatura: 22, humedad: 65 },
    { name: 'Abril', temperatura: 18, humedad: 50 },
    { name: 'Mayo', temperatura: 24, humedad: 70 },
    { name: 'Junio', temperatura: 34, humedad: 40 },
  ];

  return (
    <div>
      <div>Datos de  Temperatura</div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="temperatura" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>

      <div>Datos de Humedad</div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="humedad" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Th;
