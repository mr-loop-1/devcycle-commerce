import react, { useEffect, useState } from 'react';
import { Carousel } from './ui/carousel';
import { Card } from './ui/card';

export default function Showcase({ isSale, data }) {
  const [img1, setImg1] = useState(0);
  const [img2, setImg2] = useState(0);
  const [img3, setImg3] = useState(0);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setImg1((prev) => (prev + 1) % 3);
      setImg3((prev) => (prev + 1) % 3);
    }, 3000);
    const interval2 = setInterval(() => {
      setImg2((prev) => (prev + 1) % 3);
    }, 2000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  return (
    <div id="showcase" className="my-4">
      <div className="flex flex-col md:flex-row justify-around w-full max-sm:h-[100vw] md:h-[30vw] ">
        <Card className="max-sm:w-full md:h-full grow  p-1 md:p-2">
          {isSale ? (
            <img src={`/main.jpg`} className="h-full object-cover" />
          ) : (
            <img
              src={`/products/${data[0].products[img1].slug}.png`}
              className="h-full object-cover mx-auto"
            />
          )}
        </Card>
        <div className="max-sm:w-full md:h-full border-2 p-2 flex flex-row md:flex-col justify-between">
          <div className="max-sm:w-1/2 md:h-1/2 aspect-square bg-red-100">
            <img
              src={`/products/${data[1].products[img2].slug}.png`}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="max-sm:w-1/2 md:h-1/2 aspect-square bg-blue-100">
            <img
              src={`/products/${data[2].products[img3].slug}.png`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
