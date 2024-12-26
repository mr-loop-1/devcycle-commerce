import { useState } from 'react';
import variationJson from './../../../data/variations.json';
// import { ReactComponent as ArrowRightIcon } from '@/assets/arrowright.svg';
// import ArrowDownIcon from '@/assets/arrowdown.svg';

export default function VariationInfoSim({ label, variation }) {
  const [expand, setExpand] = useState(false);
  return (
    <div>
      <div className="">{label} variation</div>
      <div className="ml-3 my-2">
        <div className="">
          <span className="font-semibold text-orange-700 bg-orange-50 px-1 mr-2">
            {variation}
          </span>
          {expand ? (
            <img
              className="inline"
              src="/arrowdown.svg"
              onClick={() => setExpand(() => false)}
              width={10}
              height={10}
            />
          ) : (
            <img
              className="inline"
              src="/arrowright.svg"
              onClick={() => setExpand(() => true)}
              width={10}
              height={10}
            />
          )}
        </div>
        {expand && (
          <div className="ml-3 my-2 flex flex-col">
            {variationJson[variation].variablesArray.map((variable) => {
              return (
                <span>
                  <span className="font-semibold text-lime-700 bg-lime-50 px-1">
                    {variable.key}
                  </span>{' '}
                  :{' '}
                  <span className="font-bold text-pink-700 font-mono px-1">
                    {String(variable.value)}
                  </span>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
