import { useTotalQuestionsCount } from '../services/query';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';

export default function DoughnutChartDemo() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const { data: TotalQuestionsArray, isLoading: isTotalQuestionsCountLoading } =
    useTotalQuestionsCount();

  console.log(TotalQuestionsArray);

  useEffect(() => {
    const options = {
      cutout: '80%',
    };
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      datasets: [
        {
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-800'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          data: [300, 50, 80],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-600'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
      labels: ['T or F', 'Multi Choices', 'Theortical'],
    };

    setChartOptions(options);
    setChartData(data);
  }, []);

  return (
    <div className="card p-0">
      <Card className="rounded-2xl w-31.5vw" title="Analytics">
        <div className="flex justify-content-center">
          <Chart
            className="w-full md:w-40rem"
            data={chartData}
            options={chartOptions}
            type="doughnut"
          />
        </div>
      </Card>
    </div>
  );
}
