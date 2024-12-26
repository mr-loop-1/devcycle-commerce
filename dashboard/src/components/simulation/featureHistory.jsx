import featuresJson from './../../../data/features.json';
import variationJson from './../../../data/variations.json';
import { config } from '../../../config/config';
import VariationInfo from './variationInfo';
import { Card } from '../ui/card';
import { useState } from 'react';
import { MoveRightIcon } from 'lucide-react';

export default function FeatureHistorySim({ history }) {
  const [expand, setExpand] = useState(false);

  return (
    <Card className="mt-4">
      <div className="flex">
        <div className="flex flex-col  items-end w-28 pr-2 py-2">
          <span className=" my-1">feature</span>
          <span className=" my-1">variation </span>
          {expand && <span className="my-1">variables</span>}
        </div>
        <div className="flex flex-col pl-2 w-full overflow-x-auto py-2">
          <span className="my-1 ">
            <span className="font-semibold text-blue-700 bg-blue-50 px-1">
              {history.feature.key}
            </span>
          </span>
          <span className="whitespace-nowrap  my-1">
            <span className="text-orange-700 bg-orange-50 font-semibold px-1 mr-1">
              {history.oldVariation.key}
            </span>
            {/* <img src="/right.svg" className="inline" height={20} width={20} />{' '} */}
            <MoveRightIcon className="inline text-black mx-2" />
            <span className="text-orange-700 bg-orange-50 font-semibold px-1 ml-1 mr-2">
              {history.newVariation.key}
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
          </span>
          {expand &&
            variationJson[history.oldVariation.key].variablesArray.map(
              (variable) => {
                return (
                  <span
                    className="ml-4 whitespace-nowrap my-1"
                    key={variable.key}
                  >
                    <span className="text-lime-700 bg-lime-50 px-1 font-semibold mr-1">
                      {variable.key}
                    </span>
                    :
                    <span className="ml-1 text-pink-700 font-bold font-mono">
                      {String(variable.value)}
                      <MoveRightIcon className="inline text-black mx-2" />
                      {String(
                        variationJson[history.newVariation.key].variables[
                          variable.key
                        ]
                      )}
                    </span>
                  </span>
                );
              }
            )}
          <span className="ml-4"></span>
        </div>
      </div>
    </Card>
  );
}
