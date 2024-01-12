// ThHum.tsx
import { useEffect } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';
import './thHum.scss'; // Asegúrate de importar el archivo de estilo

const ThHum = () => {
  useEffect(() => {
    const tempChart = echarts.init(document.getElementById('temperatura-gauge'));
    const humChart = echarts.init(document.getElementById('humedad-gauge'));

    const fetchData = async () => {
      try {
        const response = await axios.get('http://104.248.120.74/8sb/api/clima.php');
        const climaData = response.data;

        // Obtén el último dato de temperatura de la base de datos
        const ultimaTemperatura = climaData.length > 0 ? climaData[climaData.length - 1].temp : 0;
        // Obtén el último dato de humedad de la base de datos
        const ultimaHumedad = climaData.length > 0 ? climaData[climaData.length - 1].hum : 0;

        // Configuración del gráfico de temperatura
        const tempOption = {
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
          ],
        };

        // Configuración del gráfico de humedad
        const humOption = {
          series: [
            {
              type: 'gauge',
              center: ['50%', '60%'],
              startAngle: 200,
              endAngle: -20,
              min: 0,
              max: 100,
              splitNumber: 10,
              itemStyle: {
                color: '#80b6f4',
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
                formatter: `{value} %`,
                color: 'inherit',
              },
              data: [
                {
                  value: ultimaHumedad,
                },
              ],
            },
          ],
        };

        // Aplica la configuración a los gráficos
        tempChart.setOption(tempOption);
        humChart.setOption(humOption);
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };

    fetchData();

    // Actualiza los gráficos cada 2 segundos con un valor aleatorio
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get('http://104.248.120.74/8sb/api/clima.php');
        const climaData = response.data;

        // Obtén el último dato de temperatura de la base de datos
        const ultimaTemperatura = climaData.length > 0 ? climaData[climaData.length - 1].temp : 0;
        // Obtén el último dato de humedad de la base de datos
        const ultimaHumedad = climaData.length > 0 ? climaData[climaData.length - 1].hum : 0;

        // Actualiza el gráfico de temperatura con la última temperatura
        tempChart.setOption({
          series: [
            {
              data: [
                {
                  value: ultimaTemperatura,
                },
              ],
            },
          ],
        });

        // Actualiza el gráfico de humedad con la última humedad
        humChart.setOption({
          series: [
            {
              data: [
                {
                  value: ultimaHumedad,
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
    <div className="th-hum-container">
      <div className="chart-container">
        <div className="th-hum-chart" id="temperatura-gauge" />
        <div className="th-hum-chart" id="humedad-gauge" />
      </div>
    </div>
  );
};

export default ThHum;
