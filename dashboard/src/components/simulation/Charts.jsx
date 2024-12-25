import { useState } from 'react';
import { createTargetsApi } from '@/api/devcycle';
import FeatureAction from '@/components/featureActions/FeatureAction';
import FeatureHistory from '@/components/featureActions/featureHistory';
import SalesChart from '../charts/Sales';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

export default function Charts({}) {
  return (
    <div className="bg-red-100">
      <Carousel className="w-full">
        <CarouselContent className="w-full">
          <CarouselItem className="w-full" key={0}>
            <div className="p-1">
              <SalesChart />
            </div>
          </CarouselItem>
          <CarouselItem key={1}>
            <div className="p-1">
              <SalesChart />
            </div>
          </CarouselItem>
          <CarouselItem key={3}>
            <div className="p-1">
              <SalesChart />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
