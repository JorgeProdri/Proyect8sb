import { useEffect } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const Th = () => {
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('temperatura-gauge'));

    const fetchData = async () => {
      try {
        const response = await axios.get('http://104.248.120.74/8sb/api/clima.php');
        const climaData = response.data;

        // Obtén el último dato de temperatura de la base de datos
        const ultimaTemperatura = climaData.length > 0 ? climaData[climaData.length - 1].temp : 0;

        // Configuración del gráfico
        const option = {
          series: [
            {
              type: 'gauge',
              center: ['50%', '60%'],
              startAngle: 200,
              endAngle: -20,
              min: 0,
              max: 60,
              splitNumber: 12,
              itemStyle: {
                color: '#FFAB91',
              },
              progress: {
                show: true,
                width: 30,
              },
              pointer: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  width: 30,
                },
              },
              axisTick: {
                distance: -45,
                splitNumber: 5,
                lineStyle: {
                  width: 2,
                  color: '#999',
                },
              },
              splitLine: {
                distance: -52,
                length: 14,
                lineStyle: {
                  width: 3,
                  color: '#999',
                },
              },
              axisLabel: {
                distance: -20,
                color: '#999',
                fontSize: 20,
              },
              anchor: {
                show: false,
              },
              title: {
                show: false,
              },
              detail: {
                valueAnimation: true,
                width: '60%',
                lineHeight: 40,
                borderRadius: 8,
                offsetCenter: [0, '-15%'],
                fontSize: 60,
                fontWeight: 'bolder',
                formatter: `{value} °C`,
                color: 'inherit',
              },
              data: [
                {
                  value: ultimaTemperatura,
                },
              ],
            },
            {
              type: 'gauge',
              center: ['50%', '60%'],
              startAngle: 200,
              endAngle: -20,
              min: 0,
              max: 60,
              itemStyle: {
                color: '#FD7347',
              },
              progress: {
                show: true,
                width: 8,
              },
              pointer: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              detail: {
                show: false,
              },
              data: [
                {
                  value: ultimaTemperatura,
                },
              ],
            },
          ],
        };

        // Aplica la configuración al gráfico
        myChart.setOption(option);
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };

    fetchData();

    // Actualiza el gráfico cada 2 segundos con la última temperatura
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get('http://104.248.120.74/8sb/api/clima.php');
        const climaData = response.data;

        // Obtén el último dato de temperatura de la base de datos
        const ultimaTemperatura = climaData.length > 0 ? climaData[climaData.length - 1].temp : 0;

        // Actualiza el gráfico con la última temperatura
        myChart.setOption({
          series: [
            {
              data: [
                {
                  value: ultimaTemperatura,
                },
              ],
            },
            {
              data: [
                {
                  value: ultimaTemperatura,
                },
              ],
            },
          ],
        });
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    }, 2000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <div>Temperatura Actual</div>
      <div id="temperatura-gauge" style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default Th;
