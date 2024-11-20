
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import './css/App.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Title, Tooltip, Legend);
function Modal({ isOpen, onClose, onCalculate, probabilityResult, xValue, setXValue }) {
  if (!isOpen) return null;

  const handleCalculate = () => {
    if (xValue) {
      onCalculate(parseFloat(xValue));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Calcular Probabilidade</h3>
        <label>
          Valor X:
          <input
            type="number"
            value={xValue}
            onChange={(e) => setXValue(e.target.value)}
            placeholder="Digite o valor de X"
          />
        </label>
        <div className="modal-buttons">
          <button onClick={handleCalculate}>Calcular</button>
          <button onClick={onClose}>Fechar</button>
        </div>

        {/* Exibe o resultado da probabilidade dentro do modal */}
        {probabilityResult && <p>{probabilityResult}</p>}
      </div>
    </div>
  );
}
export function TemperatureChart() {
  const [data, setData] = useState([]);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [probabilityResult, setProbabilityResult] = useState(null);
  const [xValue, setXValue] = useState(''); // Valor de X dentro do modal

  const pairs = [
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
    [9, 10],
  ];

  useEffect(() => {
    fetch('https://sasaki-nature-foundation.onrender.com/api/data?type=temperature')
      .then((response) => response.json())
      .then((fetchedData) => {
        setData(fetchedData.map((item) => ({
          id: item.id,
          temperaturas: item.temperaturas,
          mediaTemp: item.mediaTemp,
          medianaTemp: item.medianaTemp,
          modaTemp: item.modaTemp,
          desvioPTemp: item.desvioPTemp,
          coeficienteVTemp: item.coeficienteVTemp,
          assimetriaTemp: item.assimetriaTemp,
          curtoseTemp: item.curtoseTemp,
        })));
      })
      .catch((error) => console.error("Erro ao carregar dados de temperatura:", error));
  }, []);

  const getPairData = () => {
    const [id1, id2] = pairs[currentPairIndex];
    const client1 = data.find((item) => item.id === id1);
    const client2 = data.find((item) => item.id === id2);

    return { client1, client2 };
  };

  const calculateProbability = (x) => {
    const { client1 } = getPairData();
    if (client1) {
      const { mediaTemp, desvioPTemp } = client1;

      const z = (x - mediaTemp) / desvioPTemp;
      const cdf = cdfNormal(z);
      const probability = 1 - cdf;

      setProbabilityResult(`Probabilidade de temperatura ser maior que ${x}: ${(probability * 100).toFixed(2)}%`);
    }
  };

  const cdfNormal = (z) => {
    const pi = Math.PI;
    const a1 = 0.31938153;
    const a2 = -0.356563782;
    const a3 = 1.781477937;
    const a4 = -1.821255978;
    const a5 = 1.330274429;

    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const x = Math.exp(-0.5 * z * z) / Math.sqrt(2 * pi);
    const result =
      1 - x * (a1 * t + a2 * t * t + a3 * t * t * t + a4 * t * t * t * t + a5 * t * t * t * t * t);
    return result;
  };

  const { client1, client2 } = getPairData();

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Comparação de Temperatura entre Clientes Áreas arborizadas e Áreas não arborizadas`,
      },
    },
  };

  return (
    <div className="chart-temperature">
      <div className="chart-wrapper">
        {client1 && client2 && (
          <>
            <div className="chart-item">
              <Line
                data={{
                  labels: Array.from({ length: client1.temperaturas.length }, (_, index) => `Medição ${index + 1}`),
                  datasets: [
                    {
                      label: `Temperatura em áreas Arborizadas - Cliente Id: ${client1.id}`,
                      data: client1.temperaturas,
                      borderColor: 'green',
                      backgroundColor: 'rgba(0, 255, 0, 0.3)',
                    },
                    {
                      label: `Temperatura em áreas Não Arborizadas - Cliente Id: ${client2.id}`,
                      data: client2.temperaturas,
                      borderColor: 'red',
                      backgroundColor: 'rgba(255, 0, 0, 0.3)',
                      borderDash: [5, 5],
                    },
                  ],
                }}
                options={options}
              />
            </div>

            <div className="metrics-summary">
              <h5>Métricas de Temperatura - Cliente {client1.id}:</h5>
              <p>
                Média: {client1.mediaTemp}, Mediana: {client1.medianaTemp}, Moda: {client1.modaTemp}, Desvio Padrão: {client1.desvioPTemp}, 
                Coeficiente de Variação: {client1.coeficienteVTemp}, Assimetria: {client1.assimetriaTemp}, Curtose: {client1.curtoseTemp}
              </p>
              <h5>Métricas de Temperatura - Cliente {client2.id}:</h5>
              <p>
                Média: {client2.mediaTemp}, Mediana: {client2.medianaTemp}, Moda: {client2.modaTemp}, Desvio Padrão: {client2.desvioPTemp}, 
                Coeficiente de Variação: {client2.coeficienteVTemp}, Assimetria: {client2.assimetriaTemp}, Curtose: {client2.curtoseTemp}
              </p>
            </div>
          </>
        )}

        <button
          onClick={() => {
            setCurrentPairIndex((currentPairIndex + 1) % pairs.length);
          }}
          className="show-all-btn"
        >
          Ver próximo
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="probabilidade"
        >
          Calcular Probabilidade
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCalculate={calculateProbability}
          probabilityResult={probabilityResult} // Passando o resultado para o Modal
          xValue={xValue} // Passando o valor de X para o Modal
          setXValue={setXValue} // Função para atualizar o valor de X
        />
      </div>
    </div>
  );
}
export function HumidityChart() {
  const [data, setData] = useState([]);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [probabilityResult, setProbabilityResult] = useState(null); // Resultado da probabilidade
  const [xValue, setXValue] = useState(''); // Valor de X dentro do modal

  const pairs = [
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
    [9, 10],
  ];

  useEffect(() => {
    fetch('https://sasaki-nature-foundation.onrender.com/api/data?type=humidity')
      .then((response) => response.json())
      .then((fetchedData) => {
        setData(fetchedData.map((item) => ({
          id: item.id,
          umidades: item.umidades,
          mediaUmid: item.mediaUmid,
          medianaUmid: item.medianaUmid,
          modaUmid: item.modaUmid,
          desvioPUmid: item.desvioPUmid,
          coeficienteVUmid: item.coeficienteVUmid,
          assimetriaUmid: item.assimetriaUmid,
          curtoseUmid: item.curtoseUmid,
        })));
      })
      .catch((error) => console.error("Erro ao carregar dados de umidade:", error));
  }, []);

  const getPairData = () => {
    const [id1, id2] = pairs[currentPairIndex];
    const client1 = data.find((item) => item.id === id1);
    const client2 = data.find((item) => item.id === id2);

    return { client1, client2 };
  };

  const calculateProbability = (x) => {
    const { client1 } = getPairData();
    if (client1) {
      const { mediaUmid, desvioPUmid } = client1;

      const z = (x - mediaUmid) / desvioPUmid;
      const cdf = cdfNormal(z);
      const probability = 1 - cdf;

      setProbabilityResult(`Probabilidade de umidade ser maior que ${x}: ${(probability * 100).toFixed(2)}%`);
    }
  };

  const cdfNormal = (z) => {
    const pi = Math.PI;
    const a1 = 0.31938153;
    const a2 = -0.356563782;
    const a3 = 1.781477937;
    const a4 = -1.821255978;
    const a5 = 1.330274429;

    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const x = Math.exp(-0.5 * z * z) / Math.sqrt(2 * pi);
    const result =
      1 - x * (a1 * t + a2 * t * t + a3 * t * t * t + a4 * t * t * t * t + a5 * t * t * t * t * t);
    return result;
  };

  const { client1, client2 } = getPairData();

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Comparação de Umidade entre medições`,
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        {client1 && client2 && (
          <div className="chart-item">
            <h5>Comparação de umidade em áreas arborizada e áreas não arborizadas</h5>
            <Line
              data={{
                labels: Array.from({ length: client1.umidades.length }, (_, index) => `Medição ${index + 1}`),
                datasets: [
                  {
                    label: `Umidade em áreas Arborizadas - Cliente Id: ${client1.id}`,
                    data: client1.umidades,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.3)',
                  },
                  {
                    label: `Umidade em áreas Não Arborizadas - Cliente Id: ${client2.id}`,
                    data: client2.umidades,
                    borderColor: 'orange',
                    backgroundColor: 'rgba(255, 165, 0, 0.3)',
                    borderDash: [5, 5],
                  },
                ],
              }}
              options={options}
            />
          </div>
        )}

        {/* Resumo das métricas de umidade para client1 e client2 */}
        <div className="metrics-summary">
          {client1 && (
            <div>
              <h5>Métricas de Umidade em áreas arborizadas:</h5>
              <p>
                Média: {client1.mediaUmid}, Mediana: {client1.medianaUmid}, Moda: {client1.modaUmid}, 
                Desvio Padrão: {client1.desvioPUmid}, Coeficiente de Variação: {client1.coeficienteVUmid}, 
                Assimetria: {client1.assimetriaUmid}, Curtose: {client1.curtoseUmid}
              </p>
            </div>
          )}
          {client2 && (
            <div>
              <h5>Métricas de Umidade em áreas não arborizadas:</h5>
              <p>
                Média: {client2.mediaUmid}, Mediana: {client2.medianaUmid}, Moda: {client2.modaUmid}, 
                Desvio Padrão: {client2.desvioPUmid}, Coeficiente de Variação: {client2.coeficienteVUmid}, 
                Assimetria: {client2.assimetriaUmid}, Curtose: {client2.curtoseUmid}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            setCurrentPairIndex((currentPairIndex + 1) % pairs.length);
          }}
          className="show-all-btn"
        >
          Ver Próximo
        </button>

        {/* Botão para abrir o modal de cálculo de probabilidade */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="probabilidade"
        >
          Calcular Probabilidade
        </button>

        {/* Modal com o campo de cálculo de probabilidade */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCalculate={calculateProbability}
          probabilityResult={probabilityResult} // Passando o resultado para o Modal
          xValue={xValue} // Passando o valor de X para o Modal
          setXValue={setXValue} // Função para atualizar o valor de X
        />
      </div>
    </div>
  );
}