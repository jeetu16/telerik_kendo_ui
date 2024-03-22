import React from 'react';
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartTitle
} from '@progress/kendo-react-charts';
import 'hammerjs/hammer';
import { Lead } from '../interfaces';

interface ChartContainerProps {
  leads: Lead[];
}

const ChartPiContainer: React.FC<ChartContainerProps> = ({ leads }) => {
  const statusCounts: { [status: string]: number } = {};
  leads.forEach((lead) => {
    statusCounts[lead.status] = (statusCounts[lead.status] || 0) + 1;
  });

  const seriesData = Object.entries(statusCounts).map(([status, count]) => ({
    category: status,
    value: count,
  }));

  const labelContent = (props: any) => {
    const { category, value } = props.dataItem;
    return `${category}: ${value}`;
  };

  return (
    <Chart>
      <ChartTitle text='Leads by Status (Last 3 Months)'/>
      <ChartLegend position="bottom" />
      <ChartSeries>
        <ChartSeriesItem type="pie" data={seriesData} field="value" categoryField="category" labels={{ visible: true, content: labelContent }} />
      </ChartSeries>
    </Chart>
  );
};

export default ChartPiContainer;
