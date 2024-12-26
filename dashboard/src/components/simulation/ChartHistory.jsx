import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import clsx from 'clsx';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RadialChartHistory from '../charts/RadialChartHistory';
import RadialChart from '../charts/RadialChart';

export default function ChartHistory({ prev, curr }) {
  const prevCharts = structuredClone(prev);
  const currCharts = structuredClone(curr);

  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

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

    // setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="mt-2 mb-10">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-stone-100 rounded-2xl px-4">
            Insights Data Record
          </AccordionTrigger>
          <AccordionContent>
            <div className="">
              <div className="text-sm">
                {/* <div className="flex justify-center flex-wrap">
                  {buttons.slice(0, 2).map((btn) => {
                    return (
                      <span
                        className={clsx(
                          'mx-2 px-4 py-1 bg-white border border-zinc-200 rounded-xl cursor-pointer',
                          current == btn.idx && 'bg-zinc-200 border-none'
                        )}
                        onClick={() => api.scrollTo(btn.idx)}
                      >
                        {btn.name}
                      </span>
                    );
                  })}
                </div> */}
                <div className="flex justify-center flex-wrap mt-4">
                  {buttons.map((btn) => {
                    return (
                      <span
                        className={clsx(
                          'mx-2 px-4 py-1 bg-white border border-zinc-200 rounded-xl cursor-pointer',
                          current == btn.idx && 'bg-zinc-200',
                          prevCharts[btn.idx].value !=
                            currCharts[btn.idx].value && 'border-blue-600',
                          current == btn.idx &&
                            prevCharts[btn.idx].value ==
                              currCharts[btn.idx].value &&
                            'border-none'
                        )}
                        onClick={() => api.scrollTo(btn.idx)}
                      >
                        {btn.name}
                      </span>
                    );
                  })}
                </div>
              </div>
              <Carousel className="w-full scale-[.85]" setApi={setApi}>
                <CarouselContent className="w-full">
                  {/* {prevCharts.slice(0, 2).map((ch, i) => {
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

                  {prevCharts.map((ch, i) => {
                    if (ch.value == currCharts[i].value) {
                      return (
                        <CarouselItem className="w-full" key={i}>
                          <RadialChart
                            info={{
                              value: ch.value,
                              idx: i,
                              type: 2,
                            }}
                          />
                        </CarouselItem>
                      );
                    }
                    return (
                      <CarouselItem className="w-full" key={i}>
                        <RadialChartHistory
                          info1={{
                            value: ch.value,
                            idx: i,
                          }}
                          info2={{
                            value: currCharts[i].value,
                            idx: i,
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
