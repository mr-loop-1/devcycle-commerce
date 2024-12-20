import featuresJson from './../../../data/features.json';
import variationJson from './../../../data/variations.json';
import { config } from '../../../config/config';
import VariationInfo from './variationInfo';
import { Card } from '../ui/card';
import { useState } from 'react';
import { MoveRightIcon } from 'lucide-react';

export default function FeatureHistory({ history }) {
  const [expand, setExpand] = useState(false);

  return (
    <Card className="mt-4">
      <div className="flex">
        <div className="flex flex-col bg-zinc-100 items-end w-28 pr-2 py-2">
          <span>country</span>
          <span>feature</span>
          <span>variation </span>
          {expand && <span>variables</span>}
        </div>
        <div className="flex flex-col pl-2 w-full overflow-x-auto py-2">
          <span>
            <img
              src={`/${history.country.key}.svg`}
              width={20}
              height={20}
              className="inline mr-2"
            />
            {config.countries[history.country.key]}
          </span>
          <span>{history.feature.key}</span>
          <span className="whitespace-nowrap text-blue-700 font-semibold">
            {history.oldVariation.key}{' '}
            {/* <img src="/right.svg" className="inline" height={20} width={20} />{' '} */}
            <MoveRightIcon className="inline text-black mx-2" />
            {history.newVariation.key}{' '}
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
                  <span className="ml-4 whitespace-nowrap" key={variable.key}>
                    <span className="text-blue-700 font-semibold">
                      {variable.key}
                    </span>
                    :{' '}
                    <span className="text-red-700 font-semibold">
                      {variable.value}
                      <MoveRightIcon className="inline text-black mx-2" />
                      {
                        variationJson[history.newVariation.key].variables[
                          variable.key
                        ]
                      }
                    </span>
                  </span>
                );
              }
            )}
          <span className="ml-4"></span>
        </div>
      </div>
    </Card>
    // <div>
    //   <div>
    //     in country {config.countries[history.country.key]}, feature{' '}
    //     {history.feature.key} changed from {history.oldVariation.key} to{' '}
    //     {history.newVariation.key}
    //     <div className="flex">
    //       <VariationInfo label="old" variation={history.oldVariation.key} />
    //       <div className="ml-10">
    //         <VariationInfo
    //           label="current"
    //           variation={history.newVariation.key}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
