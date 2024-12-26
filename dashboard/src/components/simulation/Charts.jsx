import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import clsx from 'clsx';
import { chartConfig } from './../../../config/chartConfig';
import queriesJson from './../../../data/queries.json';
import { AlertTriangleIcon } from 'lucide-react';
import RadialChart from '../charts/RadialChart';

export default function Charts({ charts, queries }) {
  const localCharts = structuredClone(charts);
  for (const query of queries) {
    localCharts[
      chartConfig.chartToIdx[queriesJson[query.idx].normalCause.chart]
    ].status = query.status;
    localCharts[
      chartConfig.chartToIdx[queriesJson[query.idx].normalCause.chart]
    ].query = queriesJson[query.idx];
  }

  const [api, setApi] = useState();
  const [current, setCurrent] = useState(3);

  const buttons = [
    // {
    //   name: 'sales',
    //   idx: 0,
    // },
    // {
    //   name: 'profits',
    //   idx: 1,
    // },
    {
      name: 'complaints',
      idx: 0,
    },
    {
      name: 'checkout abandon',
      idx: 1,
    },
    {
      name: 'cart abandons',
      idx: 2,
    },
    {
      name: 'out-of-stock cancel',
      idx: 3,
    },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="border-b-2">
      <div className="text-sm">
        {/* <div className="flex justify-center flex-wrap">
          {buttons.slice(0, 2).map((btn) => {
            return (
              <span
                className={clsx(
                  'mx-2 px-4 py-1 bg-white border border-zinc-200 rounded-xl cursor-pointer',
                  current == btn.idx && 'bg-zinc-200',
                  current == btn.idx &&
                    !localCharts[btn.idx].status &&
                    'border-none',
                  localCharts[btn.idx].status == 1 && 'border-orange-600',
                  localCharts[btn.idx].status == 2 && 'border-red-600'
                )}
                onClick={() => api.scrollTo(btn.idx)}
              >
                {btn.name}{' '}
                {localCharts[btn.idx].status == 2 && (
                  <AlertTriangleIcon className="text-red-600 inline w-4 h-4" />
                )}
              </span>
            );
          })}
        </div> */}
        <div className="flex justify-center flex-wrap my-4">
          {buttons.map((btn) => {
            return (
              <span
                className={clsx(
                  'mx-1 px-3 py-1 bg-white border border-zinc-200 rounded-xl cursor-pointer',
                  current == btn.idx && 'bg-zinc-200',
                  current == btn.idx &&
                    !localCharts[btn.idx].status &&
                    'border-none',
                  localCharts[btn.idx].status == 1 && 'border-orange-600',
                  localCharts[btn.idx].status > 1 && 'border-red-600'
                )}
                onClick={() => api.scrollTo(btn.idx)}
              >
                {btn.name}{' '}
                {localCharts[btn.idx].status > 1 && (
                  <AlertTriangleIcon className="text-red-600 inline w-4 h-4" />
                )}
              </span>
            );
          })}
        </div>
      </div>
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent className="w-full">
          {/* {localCharts.slice(0, 2).map((ch, i) => {
            return (
              <CarouselItem className="w-full" key={i}>
                <BarChartSim
                  info={{
                    value: ch.value,
                    query: ch.query,
                    status: ch.status,
                    idx: i,
                  }}
                />
              </CarouselItem>
            );
          })} */}

          {localCharts.map((ch, i) => {
            return (
              <CarouselItem className="w-full" key={i}>
                <RadialChart
                  info={{
                    value: ch.value,
                    query: ch.query,
                    status: ch.status,
                    idx: i,
                    type: 1,
                  }}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
