import react from 'react';
import { Carousel } from './ui/carousel';
import { Card } from './ui/card';

export default function Showcase() {
  return (
    <div id="showcase" className="mx-20">
      <div className="flex justify-around">
        <div className="grow-[3] bg-gray-400">
          <Card className="w-full h-full"></Card>
        </div>
        <div className="grow bg-green-200">wqda</div>
      </div>
    </div>
  );
}
