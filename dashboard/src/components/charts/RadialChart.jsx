'use client';

import { TriangleAlertIcon } from 'lucide-react';
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

const suggestions = [
  <span>
    Consider toggling off the{' '}
    <span className="bg-lime-50 px-1 text-lime-700 font-semibold">
      recommend-page
    </span>{' '}
    variable in the{' '}
    <span className="bg-blue-50 px-1 text-blue-700 font-semibold">
      cart-interface
    </span>{' '}
    feature.
  </span>,
  <span>
    Consider toggling off chatbot by setting off the{' '}
    <span className="bg-lime-50 px-1 text-lime-700 font-semibold">
      chatbot-status
    </span>{' '}
    variable
  </span>,
  <span>
    Consider incrementing the shipping discounts on primary and 3rd party
    shipping using the{' '}
    <span className="bg-lime-50 px-1 text-lime-700 font-semibold">
      shipping-waiver
    </span>{' '}
    variable
  </span>,
  <span>
    Consider turning off the new cart flow altogether using the{' '}
    <span className="bg-lime-50 px-1 text-lime-700 font-semibold">
      cart-interface
    </span>{' '}
    variable's base variation
  </span>,
  <span>
    Consider setting the{' '}
    <span className="bg-lime-50 px-1 text-lime-700 font-semibold">
      sort-strategy
    </span>{' '}
    variable to{' '}
    <span className=" text-pink-700 font-mono font-bold">stock</span> variation
    to have overstocked items first
  </span>,
];

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

export default function RadialChart({ info }) {
  /*
    value, query, status, totalValue
    description, title, 
  */
  const chartData = [
    {
      [chartsJson[info.idx].dataType]: info.value,
      fill: 'var(--color-safari)',
    },
  ];
  if (info.query) {
    chartData[0].fill = 'var(--color-orange)';
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{chartsJson[info.idx].title}</CardTitle>
        {info.type == 1 && (
          <CardDescription className="text-center">
            {chartsJson[info.idx].description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
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
              domain={[0, chartsJson[info.idx].maxValue]}
              type="number"
              angleAxisId={0}
              tick={false}
            />
            <RadialBar dataKey={chartsJson[info.idx].dataType} background />
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
                          {chartData[0][chartsJson[info.idx].dataType]}/
                          {chartsJson[info.idx].maxValue}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {chartsJson[info.idx].dataType}
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

      <CardFooter className="flex-col gap-2 text-sm">
        {info.query && info.status == 2 && (
          <div className="text-red-700 font-medium text-center underline">
            Warning <TriangleAlertIcon className="inline w-3 h-3" /> : If action
            is not taken now, you may lose the simulation
          </div>
        )}
        {info.query && info.status == 3 && (
          <div className="text-red-700 font-medium text-center underline">
            Danger <TriangleAlertIcon className="inline w-3 h-3" /> : The
            severity mark was breached
          </div>
        )}
        {info.query && (
          <div className="flex mt-4">
            <div className="mr-3 min-w-8">
              <img src="/metrics.svg" className="w-8 h-8" />
            </div>
            <div className="flex flex-col items-start">
              <span className="">
                <span className="text-orange-700 font-semibold">Insight:</span>{' '}
                {info.query.query}
              </span>

              <span className="mt-2">
                <span className="text-blue-700 font-semibold">Suggestion:</span>{' '}
                {suggestions[info.idx]}
              </span>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
