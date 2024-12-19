import { useState } from 'react';
import variationJson from './../../../data/variations.json';
import ArrowRightIcon from '@/assets/arrowright.svg';
import ArrowDownIcon from '@/assets/arrowdown.svg';

export default function VariationInfo({ label, variation }) {
  const [expand, setExpand] = useState(false);
  return (
    <div>
      <div className="">{label} variation</div>
      <div className="">
        <div className="">
          {variation}
          {expand ? <ArrowDownIcon /> : <ArrowRightIcon />}
        </div>
        <div className="ml-4"></div>
      </div>
    </div>
  );
}
