import react, { useEffect, useState } from 'react';
import { Carousel } from './ui/carousel';
import { Card } from './ui/card';

export default function Showcase({ isSale, data }) {
  const [img1, setImg1] = useState(0);
  const [img2, setImg2] = useState(0);
  const [img3, setImg3] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImg1((prev) => (prev + 1) % 3);
      setImg3((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="showcase" className="mx-4">
      <div className="flex flex-col md:flex-row justify-around w-full h-96 md:h-96">
        <div className="w-full md:w-[66%] h-[66%] md:h-full bg-gray-400 p-2">
          {isSale ? (
            <img
              src={`/products/${data[0].products[img2].slug}.png`}
              className=""
            />
          ) : (
            <img src={`/main.jpg`} className="" />
          )}
        </div>
        <div className="w-full md:w-[33%] h-[33%] md:h-full bg-green-200 p-2 flex flex-row md:flex-col justify-between">
          <div className="w-full h-full bg-red-100">
            <img
              src={`/products/${data[1].products[img2].slug}.png`}
              className=""
            />
          </div>
          <div className="w-full h-full bg-blue-100">
            <img
              src={`/products/${data[2].products[img3].slug}.png`}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
