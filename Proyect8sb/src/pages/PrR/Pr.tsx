import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Pr = () => {
  const [radiacionData, setRadiacionData] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://104.248.120.74/8sb/api/clima.php');
        const climaData = response.data;

        // Obtén los últimos 7 datos de radiación solar
        const ultimosDatos = climaData.slice(-7).map((item: any) => ({ rad_solar: item.rad_solar }));

        // Actualiza el estado con los datos
        setRadiacionData(ultimosDatos);
      } catch (error) {
        console.error('Error al obtener datos de radiación solar:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>Gráfico de Radiación Solar</div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={radiacionData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rad_solar" />
          <YAxis type="number" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="rad_solar" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Pr;
