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

const chartConfig = {
  cpm: {
    label: 'Complaints',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
};

export function ComplaintsHistory({ info }) {
  const chartData1 = [{ cpm: info.prev, fill: 'var(--color-safari)' }];
  const chartData2 = [{ cpm: info.curr, fill: 'var(--color-safari)' }];
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Complaints Tracking - Chatbot</CardTitle>
        <CardDescription className="text-center">
          The customer care team is tracking the complaints-per-minute (cpm) of
          experitmental chatbot such as unhelpful or rude behavior. Try to keep
          it down under 100 cpm.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex pb-0 justify-around items-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-h-[200px] my-[50px]"
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
              domain={[0, 100]}
              type="number"
              angleAxisId={0}
              tick={false}
            />
            <RadialBar dataKey="cpm" background />
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
                          {chartData1[0].cpm}/100
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          cpm
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
          className="mx-auto aspect-square w-full max-h-[200px]  my-[50px]"
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
              domain={[0, 100]}
              type="number"
              angleAxisId={0}
              tick={false}
            />
            <RadialBar dataKey="cpm" background />
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
                          {chartData2[0].cpm}/100
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          cpm
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
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total cpm for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
