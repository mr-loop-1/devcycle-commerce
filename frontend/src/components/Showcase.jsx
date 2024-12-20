import react from 'react';
import { Carousel } from './ui/carousel';
import { Card } from './ui/card';

export default function Showcase() {
  return (
    <div id="showcase" className="mx-4 lg:mx-20">
      <div className="flex flex-col md:flex-row justify-around w-full h-96 md:h-96">
        <div className="w-full md:w-[66%] h-[66%] md:h-full bg-gray-400 p-2"></div>
        <div className="w-full md:w-[33%] h-[33%] md:h-full bg-green-200 p-2 flex flex-row md:flex-col justify-between">
          <div className="w-full h-full bg-red-100"></div>
          <div className="w-full h-full bg-blue-100"></div>
        </div>
      </div>
    </div>
  );
}
