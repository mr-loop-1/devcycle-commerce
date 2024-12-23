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
            <DialogDescription>
              <div>features</div>
              {Object.keys(featuresJson).map((fk) => {
                return (
                  <div className="ml-2">
                    <span>
                      <span>{fk}</span>:{' '}
                      <span>"{featuresJson[fk].description}"</span>
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
    <div className="ml-2">
      <div>
        variables{' '}
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
          <div className="flex flex-col ml-2">
            {feature.variables.map((variable) => {
              return (
                <span>
                  {variable.key} {variable.type} {variable.description}
                  {variablesJson[variable.key] && (
                    <RefValues values={variablesJson[variable.key].values} />
                  )}
                </span>
              );
            })}
          </div>
        )}
      </div>
      <div>
        vaiation{' '}
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
          <div className="flex flex-col ml-2">
            {feature.variations.map((variation) => {
              return (
                <span>
                  {variation.key} {variation.description}
                  <div className="ml-2 flex flex-col">
                    {feature.variables.map((variable) => {
                      return (
                        <span>
                          {variable.key}:{' '}
                          {String(variation.variables[variable.key])}
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
    <div className="ml-2">
      values{' '}
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
                "{v.value}": {v.description}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
