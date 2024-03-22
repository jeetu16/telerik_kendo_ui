import React from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend,
} from "@progress/kendo-react-charts";

import { Lead } from "../interfaces";

const ChartBarContainer: React.FC<Lead> = ({ leads }) => {
  const currentDate = new Date();

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(currentDate.getMonth() - 2);

  const lastThreeMonthsLeads = leads.filter(
    (lead: { lead_creation_date: string | number | Date }) => {
      const leadDate = new Date(lead.lead_creation_date);
      return leadDate >= threeMonthsAgo && leadDate <= currentDate;
    }
  );

  const totalRevenueForMonth = lastThreeMonthsLeads.reduce(
    (
      acc: any,
      lead: { lead_creation_date: string | number | Date; property_value: any }
    ) => {
      const leadDate = new Date(lead.lead_creation_date);
      const month = leadDate.getMonth();
      acc[month] = (acc[month] || 0) + lead.property_value;
      return acc;
    },
    {}
  );

  const revenueData = Object.keys(totalRevenueForMonth).map((month) => {
    return (totalRevenueForMonth[month] * 0.008).toFixed(2);
  });

  const monthNames: any = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  const categories = Object.keys(totalRevenueForMonth).map(
    (month) => monthNames[parseInt(month)]
  );

  return (
    <>
      <Chart style={{ height: 350 }}>
        <ChartTitle text="Revenue by Month (Last 3 months)" />
        <ChartLegend position="top" orientation="horizontal" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={categories} startAngle={45} />
        </ChartCategoryAxis>
        <ChartSeries>
          <ChartSeriesItem
            type="column"
            tooltip={{ visible: true }}
            data={revenueData}
            name="Revenue"
            style="step"
          />
        </ChartSeries>
      </Chart>
    </>
  );
};

export default ChartBarContainer;
