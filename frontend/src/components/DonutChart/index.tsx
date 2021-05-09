import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';

type ChartData = {
    labels: string[];
    series: number[];
}

function DonutChart() {

    // Forma correta
    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });


    // Forma errada
    //let chartData: ChartData = { labels: [], series: [] };

    // Faz a chamada para o backend 
    //axios.get(BASE_URL + "/sales/sum-by-seller")
    //    .then( response => {
    //        console.log(response.data)
    //        const data = response.data as SaleSum[];
    //       const myLabels = data.map(x => x.sellerName);
    //        const mySeries = data.map(x => x.sum);
    //        // forma errada
    // chartData =  { labels: myLabels, series: mySeries };

    // forma correta? 
    //         setChartData({ labels: myLabels, series: mySeries });

    // Deu loop pois ainda esta errado.

    //         console.log(chartData)
    //   });

    // Forma correta
    useEffect(() => {
        axios.get(BASE_URL + "/sales/sum-by-seller")
            .then(response => {
                //console.log(response.data)
                const data = response.data as SaleSum[];
                const myLabels = data.map(x => x.sellerName);
                const mySeries = data.map(x => x.sum);

                setChartData({ labels: myLabels, series: mySeries });


                //console.log(chartData) Tem que remover os consoles.log daqui de dentro.
            });
    }, []);
    // o segundo parametro e o conjunto de dados que o useEffects vai observar para refazer a 
    // consulta em caso de alteracao.


    // Pode ser assim tbm (ainda errado)
    // axios.get(`${BASE_URL}/sales/sum-by-seller`)
    // O .then define uma funcao que eh executada com sucesso
    // response eh um nome para a variavel que vai receber a resposta
    // response.data é o corpo da resposta

    // No log apareceu duas vezes a chamada da rotina.
    // Isso ocorre poque e executado uma chamada assincrona e antes que a resposta chegue o
    // motor do browser continua a renderizar a tela.
    // o grafico fica com o valor inicial da variavel (vazio) e pode ocorrer da chamada ser feita mais
    // de uma vez.


    //const mockData = {
     //   series: [477138, 499928, 444867, 220426, 473088],
    //    labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    //}

    const options = {
        legend: {
            show: true
        }
    }

    return (
        //<Chart
        //options={{...options, labels: mockData.labels}}
        //series={mockData.series}
        //type="donut"
        //height="240"
        ///>
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"
        />
    );
}

export default DonutChart;