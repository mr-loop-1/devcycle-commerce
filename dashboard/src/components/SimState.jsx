import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import featuresJson from './../../data/features.json';
import variablesJson from './../../data/variables.json';
import variationsJson from './../../data/variations.json';

import { config } from './../../config/config.js';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function SimState({ featureState }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-blue-700">State</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90%] md:max-w-[50%] lg:max-w-[30%] overflow-y-auto max-h-screen">
          <DialogHeader>
            <DialogTitle>Devcycle Live Feature Snapshot</DialogTitle>
            <DialogDescription className="text-base">
              <div className="">features</div>
              <div className="ml-3 my-2 flex flex-col">
                {Object.keys(featuresJson).map((fk) => {
                  return (
                    <RefFeature
                      featureKey={fk}
                      country={'in'}
                      featureState={featureState}
                    />
                  );
                })}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function RefFeature({ featureKey, featureState, country }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-1">
      <span className="bg-blue-50 text-blue-600 font-semibold px-1 mr-2">
        {featureKey}
      </span>
      {open ? (
        <img
          className="inline"
          src="/arrowdown.svg"
          onClick={() => setOpen(() => false)}
          width={10}
          height={10}
        />
      ) : (
        <img
          className="inline"
          src="/arrowright.svg"
          onClick={() => setOpen(() => true)}
          width={10}
          height={10}
        />
      )}
      {open && (
        <div className="ml-3 flex flex-col">
          <span>
            served variation:{' '}
            <span className="bg-orange-50 text-orange-700 font-semibold px-1">
              {featureState[country][featureKey].served.key}
            </span>
          </span>
          <span>
            served variables
            <div className="ml-2 flex flex-col">
              {variationsJson[
                featureState[country][featureKey].served.key
              ].variablesArray.map((variable) => {
                return (
                  <span>
                    <span className="bg-lime-50 text-lime-700 font-semibold">
                      {variable.key}
                    </span>
                    :{' '}
                    <span className="text-pink-700 font-bold font-mono">
                      {String(variable.value)}
                    </span>
                  </span>
                );
              })}
            </div>
          </span>
        </div>
      )}
    </div>
  );
}
