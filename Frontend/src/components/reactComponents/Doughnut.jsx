import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

console.log("data",data);

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Clean', 'Scam', 'Not Voted'],
  datasets: [
    {
      label: '# of Votes',
      data: [50, 40, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(32, 153, 32, 0.84)',
        'rgba(239, 243, 239, 0.84)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(32, 153, 32, 0.84)',
        'rgba(239, 243, 239, 0.84)'
      ],
      borderWidth: 1,
    },
  ],
};

export function App() {
  return <Doughnut data={data} />;
}
