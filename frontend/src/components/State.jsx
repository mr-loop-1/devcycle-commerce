import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import variationsJson from './../../config/variations.json';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useDevCycleClient } from '@devcycle/react-client-sdk';

export default function State() {
  const devcycleClient = useDevCycleClient();

  const features = devcycleClient.allFeatures();

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>State</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90%] md:max-w-[60%] lg:max-w-[40%] overflow-y-auto max-h-screen">
          <DialogHeader>
            <DialogTitle>Devcycle Live Feature Snapshot</DialogTitle>
            <DialogDescription className="text-base">
              <div className="ml-3 my-2 flex flex-col">
                {Object.keys(features).map((fk) => {
                  return <RefFeature featureKey={fk} features={features} />;
                })}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function RefFeature({ featureKey, features }) {
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
              {features[featureKey].variationKey}
            </span>
          </span>
          <span>
            served variables
            <div className="ml-2 flex flex-col">
              {variationsJson[
                features[featureKey].variationKey
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
