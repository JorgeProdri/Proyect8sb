import { useEffect } from 'react';
import * as echarts from 'echarts';

const Home = () => {
  // Datos de ejemplo para el gráfico de líneas
  const fechaData = [
    '2024-01-08 08:51:42.800987-05',
    '2024-01-08 08:51:42.841611-05',
    '2024-01-08 08:51:42.849575-05',
    '2024-01-08 08:51:42.858003-05',
    '2024-01-08 08:51:42.865983-05',
    '2024-01-08 08:51:42.873914-05',
    '2024-01-08 08:51:42.881894-05',
    '2024-01-08 08:51:42.889231-05',
    '2024-01-08 08:51:42.897237-05',
    '2024-01-08 08:51:42.905061-05',
    '2024-01-08 08:51:42.913063-05',
    '2024-01-08 08:51:42.921357-05',
    '2024-01-08 08:51:42.930126-05',
    '2024-01-08 08:51:42.938101-05',
    '2024-01-08 08:51:42.955113-05',
    '2024-01-08 08:51:42.964543-05',
    '2024-01-08 08:51:42.974151-05',
    '2024-01-08 08:51:42.983125-05',
    '2024-01-08 08:51:42.992102-05',
    '2024-01-08 08:51:43.000244-05',
    '2024-01-08 08:51:43.00966-05',
    '2024-01-08 08:51:43.018613-05',
    '2024-01-08 08:51:43.027315-05',
    '2024-01-08 08:51:43.036168-05',
  ];

  const temperaturaData = [
    25.00, 25.00, 26.00, 26.00, 24.00,
    23.00, 24.00, 25.00, 26.00, 26.00,
    25.00, 26.00, 26.00, 26.00, 25.00,
    26.00, 25.00, 24.00, 26.00, 25.00,
    24.00, 24.00, 23.00, 23.00
  ];

  const humedadData = [
    45.00, 42.00, 45.00, 47.00, 58.00,
    63.00, 49.00, 58.00, 49.00, 39.00,
    47.00, 49.00, 46.00, 42.00, 54.00,
    48.00, 58.00, 69.00, 55.00, 67.00,
    63.00, 66.00, 61.00, 63.00
  ];

  const optionTemperatura = {
    xAxis: {
      type: 'category',
      data: fechaData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: temperaturaData,
        type: 'line',
        name: 'Temperatura',
      },
    ],
  };
  const optionHumedad = {
    xAxis: {
      type: 'category',
      data: fechaData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: humedadData,
        type: 'line',
        name: 'Humedad',
      },
    ],
  };

  useEffect(() => {
    const chartContainerTemperatura = document.getElementById('line-chart-container-temperatura');
    const chartContainerHumedad = document.getElementById('line-chart-container-humedad');

    const chartTemperatura = echarts.init(chartContainerTemperatura);
    const chartHumedad = echarts.init(chartContainerHumedad);

    chartTemperatura.setOption(optionTemperatura);
    chartHumedad.setOption(optionHumedad);

    return () => {
      chartTemperatura.dispose();
      chartHumedad.dispose();
    };
  }, []);

  return (
    <div className="home">
      <div className="box">
        <div>Temperatura</div>
        <div id="line-chart-container-temperatura" style={{ width: '100%', height: '300px' }} />
      </div>
      <div className="box">
        <div>Humedad</div>
        <div id="line-chart-container-humedad" style={{ width: '100%', height: '300px' }} />
      </div>
    </div>
  );
};

export default Home;
