'use client';

import * as React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import chartsJson from './../../../data/charts.json';

const chartConfig = {
  views: {
    label: 'Page Views',
  },
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
};

export default function BarChartSim({ info }) {
  const chartData = info.value.map((val) => {
    return {
      [chartsJson[info.idx].dataType]: val,
    };
  });
  chartData[chartData.length - 1].fill = '#2ca02c';

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />

            <YAxis
              dataKey={chartsJson[info.idx].dataType}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return value;
              }}
              ticks={[500]}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={() => {
                    return 'Total Sales';
                  }}
                />
              }
            />
            <Bar
              dataKey={chartsJson[info.idx].dataType}
              fill={`var(--color-desktop)`}
              maxBarSize={40}
            />

            <ReferenceLine
              y={500}
              label="target"
              stroke="red"
              strokeDasharray="3 3"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
