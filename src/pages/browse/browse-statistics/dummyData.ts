import { ChartConfig } from 'src/utility/config/chart';

const table = [
  {
    entity: 'Data product',
    published: 100,
    submitted: 50,
    draft: 25,
  },
  {
    entity: 'Webservice',
    published: 100,
    submitted: 50,
    draft: 25,
  },
  {
    entity: 'Organization',
    published: 100,
    submitted: 50,
    draft: 25,
  },
];

const groups = [
  {
    labels: ['Published', 'Submitted', 'Draft', 'Discarded'],
    datasets: [
      {
        label: 'TCS Volcanology',
        data: [65, 12, 31, 150],
        fill: false,
        ...ChartConfig.COLOR_CONFIG,
      },
    ],
  },
  {
    labels: ['Published', 'Submitted', 'Draft', 'Discarded'],
    datasets: [
      {
        label: 'TCS Seismology',
        data: [12, 200, 57, 100],
        fill: false,
        ...ChartConfig.COLOR_CONFIG,
      },
    ],
  },
  {
    labels: ['Published', 'Submitted', 'Draft', 'Discarded'],
    datasets: [
      {
        label: 'TCS NFO',
        data: [120, 289, 24, 76],
        fill: false,
        ...ChartConfig.COLOR_CONFIG,
      },
    ],
  },
  {
    labels: ['Published', 'Submitted', 'Draft', 'Discarded'],
    datasets: [
      {
        label: 'TCS Anthropogenic Hazard',
        data: [60, 341, 12, 32],
        fill: false,
        ...ChartConfig.COLOR_CONFIG,
      },
    ],
  },
];

export { table, groups };
