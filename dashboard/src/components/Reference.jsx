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

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Reference() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>Reference</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Devcycle Specs Reference</DialogTitle>
            <DialogDescription className="text-base">
              <div className="mt-4 mb-2">features</div>
              {Object.keys(featuresJson).map((fk) => {
                return (
                  <div className="ml-3 my-3">
                    <span>
                      <span className="bg-blue-50 text-blue-700 font-semibold px-1">
                        {fk}
                      </span>
                      : <span>"{featuresJson[fk].description}"</span>
                    </span>
                    <ReferenceChildren feature={featuresJson[fk]} />
                  </div>
                );
              })}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ReferenceChildren({ feature }) {
  const [openVariable, setOpenVariable] = useState(false);
  const [openVariation, setOpenVariation] = useState(false);

  return (
    <div className="ml-3 my-1">
      <div>
        <span className="text-lime-700 font-semibold mr-2">variables</span>
        {openVariable ? (
          <img
            className="inline"
            src="/arrowdown.svg"
            onClick={() => setOpenVariable(() => false)}
            width={10}
            height={10}
          />
        ) : (
          <img
            className="inline"
            src="/arrowright.svg"
            onClick={() => setOpenVariable(() => true)}
            width={10}
            height={10}
          />
        )}
        {openVariable && (
          <div className="flex flex-col ml-2 my-1">
            {feature.variables.map((variable) => {
              return (
                <div>
                  <span className="flex">
                    <span className="text-lime-700 bg-lime-50 px-2 font-semibold shrink-0 h-fit">
                      {variable.key}
                    </span>

                    <span className="text-pink-700 font-bold mx-2 font-mono">
                      {variable.type}
                    </span>
                    {variable.description}
                  </span>
                  {variablesJson[variable.key] && (
                    <RefValues values={variablesJson[variable.key].values} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div>
        <span className="text-orange-700 font-semibold mr-2">vaiations</span>
        {openVariation ? (
          <img
            className="inline"
            src="/arrowdown.svg"
            onClick={() => setOpenVariation(() => false)}
            width={10}
            height={10}
          />
        ) : (
          <img
            className="inline"
            src="/arrowright.svg"
            onClick={() => setOpenVariation(() => true)}
            width={10}
            height={10}
          />
        )}
        {openVariation && (
          <div className="flex flex-col ml-3 my-1">
            {feature.variations.map((variation) => {
              return (
                <span>
                  <span className="text-orange-700 bg-orange-50 px-2 font-semibold">
                    {variation.key}
                  </span>
                  <div className="ml-5 my-1 flex flex-col">
                    {feature.variables.map((variable) => {
                      return (
                        <span>
                          <span className="font-semibold text-lime-700 bg-lime-50 px-1 mr-1">
                            {variable.key}
                          </span>
                          :{' '}
                          <span className="ml-1 font-bold font-mono text-pink-700">
                            {String(variation.variables[variable.key])}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function RefValues({ values }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="ml-5">
      <span className="text-pink-700 mr-2">values</span>
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
          {values.map((v) => {
            return (
              <span>
                <span className="font-semibold text-pink-700 mr-1">
                  "{v.value}"
                </span>
                : {v.description}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
