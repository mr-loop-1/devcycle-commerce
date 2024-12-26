'use client';

import { ArrowBigRightIcon, TrendingUp } from 'lucide-react';
import {
  Label,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import chartsJson from './../../../data/charts.json';

const chartConfig = {
  cpm: {
    label: 'Complaints',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  orange: {
    label: 'Orange',
    color: 'hsl(var(--chart-1))',
  },
};

export default function RadialChartHistory({ info1, info2 }) {
  const chartData1 = [
    {
      [chartsJson[info1.idx].dataType]: info1.value,
      fill: 'var(--color-safari)',
    },
  ];
  if (info1.value >= chartsJson[info1.idx].maxValue) {
    chartData1[0].fill = 'var(--color-orange)';
  }

  const chartData2 = [
    {
      [chartsJson[info2.idx].dataType]: info2.value,
      fill: 'var(--color-safari)',
    },
  ];
  if (info2.value >= chartsJson[info2.idx].maxValue) {
    chartData2[0].fill = 'var(--color-orange)';
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Complaints Tracking - Chatbot</CardTitle>
      </CardHeader>
      <CardContent className="flex pb-0 justify-around items-center py-5 overflow-x-auto">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-h-[200px]"
        >
          <RadialBarChart
            data={chartData1}
            startAngle={0}
            // endAngle={100}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <PolarAngleAxis
              domain={[0, chartsJson[info1.idx].maxValue]}
              type="number"
              angleAxisId={0}
              tick={false}
            />
            <RadialBar dataKey={chartsJson[info1.idx].dataType} background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {chartData1[0][chartsJson[info1.idx].dataType]}/
                          {chartsJson[info1.idx].maxValue}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {chartsJson[info1.idx].dataType}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
        <ArrowBigRightIcon className="inline w-28 h-28" />
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-h-[200px]"
        >
          <RadialBarChart
            data={chartData2}
            startAngle={0}
            // endAngle={100}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <PolarAngleAxis
              domain={[0, chartsJson[info2.idx].maxValue]}
              type="number"
              angleAxisId={0}
              tick={false}
            />
            <RadialBar dataKey={chartsJson[info2.idx].dataType} background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {chartData2[0][chartsJson[info2.idx].dataType]}/
                          {chartsJson[info2.idx].maxValue}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {chartsJson[info2.idx].dataType}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  );
}
