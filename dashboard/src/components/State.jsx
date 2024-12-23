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

export default function State({ featureState }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>State</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Devcycle Flags Snapshot</DialogTitle>
            <DialogDescription>
              <div className="">countries</div>
              {config.countriesArray.map((country) => {
                return (
                  <ReferenceCountry
                    country={country}
                    featureState={featureState}
                  />
                );
              })}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ReferenceCountry({ country, featureState }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <span>{config.countries[country]}</span>
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
        <div className="ml-2">
          <div>features</div>
          <div className="ml-2 flex flex-col">
            {Object.keys(featuresJson).map((fk) => {
              return (
                <RefFeature
                  featureKey={fk}
                  country={country}
                  featureState={featureState}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function RefFeature({ featureKey, featureState, country }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="ml-2">
      <div className="">
        {featureKey}
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
          <div className="ml-2 flex flex-col">
            <span>
              served variation: {featureState[country][featureKey].served.key}
            </span>
            <span>
              served variables
              <div className="ml-2 flex flex-col">
                {variationsJson[
                  featureState[country][featureKey].served.key
                ].variablesArray.map((variable) => {
                  return (
                    <span>
                      {variable.key}: {String(variable.value)}
                    </span>
                  );
                })}
              </div>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
