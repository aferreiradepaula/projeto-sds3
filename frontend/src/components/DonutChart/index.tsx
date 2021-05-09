import axios from 'axios';
import Chart from 'react-apexcharts'
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';

type ChartData = {
    labels: string[];
    series: number[];
}

function DonutChart() {

    // Forma errada
    let chartData: ChartData = { labels: [], series: [] };

    // Faz a chamada para o backend
    axios.get(BASE_URL + "/sales/sum-by-seller")
        .then( response => {
            console.log(response.data)
            const data = response.data as SaleSum[];
            const myLabels = data.map(x => x.sellerName);
            const mySeries = data.map(x => x.sum);
            chartData =  { labels: myLabels, series: mySeries };

            console.log(chartData)
        });

    // Pode ser assim tbm
    // axios.get(`${BASE_URL}/sales/sum-by-seller`)
    // O .then define uma funcao que eh executada com sucesso
    // response eh um nome para a variavel que vai receber a resposta
    // response.data é o corpo da resposta

    // No log apareceu duas vezes a chamada da rotina.
    // Isso ocorre poque o react para se certificar que o codigo rodou, executa mais de uma vez (acho que 
    // eh isso mesmo) e dependendo da complexidade da pagina, ateh mais.

    // FORMA CORRETA


    const mockData = {
        series: [477138, 499928, 444867, 220426, 473088],
        labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    }

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