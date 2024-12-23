import { useState } from 'react';
import variationJson from './../../../data/variations.json';
// import { ReactComponent as ArrowRightIcon } from '@/assets/arrowright.svg';
// import ArrowDownIcon from '@/assets/arrowdown.svg';

export default function VariationInfo({ label, variation }) {
  const [expand, setExpand] = useState(false);
  return (
    <div>
      <div className="">{label} variation</div>
      <div className="">
        <div className="">
          {variation}
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
          <div className="ml-4">
            <ul>
              {variationJson[variation].variablesArray.map((variable) => {
                return (
                  <li>
                    {variable.key} : {String(variable.value)}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
