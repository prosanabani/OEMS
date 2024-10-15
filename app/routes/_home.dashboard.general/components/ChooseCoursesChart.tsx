import { useAllCoursesLists, useCoursesQuestionsData } from '../services/query';
import { useDashboardAnalyticsStore } from '../store';
import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';

function ChooseCoursesChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const selectedCourses = useDashboardAnalyticsStore(
    (state) => state.selectedCourses
  );

  const { data: selectedCoursesData } = useCoursesQuestionsData(
    selectedCourses || []
  );

  const { data: allCourses } = useAllCoursesLists();

  const selectedCoursesNames = allCourses
    ?.map((item) =>
      selectedCourses?.includes(item?.value || '') ? item?.label : null
    )
    .filter((item) => item !== null);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--alpha-grey-200');

    const generateCourseData = () => {
      return [
        {
          backgroundColor: documentStyle.getPropertyValue('--blue-900'),
          borderColor: documentStyle.getPropertyValue('--blue-900'),
          data: selectedCoursesData?.aiQuestions,
          label: 'AI-Generated-Questions',
        },
        {
          backgroundColor: documentStyle.getPropertyValue('--red-500'),
          borderColor: documentStyle.getPropertyValue('--red-500'),
          data: selectedCoursesData?.normalQuestions,
          label: 'Normal-Questions',
        },
      ];
    };

    const data = {
      datasets: generateCourseData(),
      labels: selectedCoursesNames,
    };

    const options = {
      aspectRatio: 0.8,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
          ticks: {
            color: textColorSecondary,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCourses, selectedCoursesData]);

  return <Chart data={chartData} options={chartOptions} type="bar" />;
}

export default ChooseCoursesChart;
