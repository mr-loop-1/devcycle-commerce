import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { config } from '../../../config/config';
import featuresJson from './../../../data/features.json';
import VariationsJson from './../../../data/variations.json';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import VariationInfoSim from './variationInfo';

export default function FeatureActionSim({
  featureState,
  loading,
  handleAction,
  error,
}) {
  const country = 'in';
  const [feature, setFeature] = useState(null);
  const [variation, setVariation] = useState(null);

  // outline the tab with red when error occurs
  return (
    <Card className="mt-6 py-4 md:py-8 px-4">
      <div className="text-center font-semibold">Feature Action</div>

      <div className="mt-4">
        <Label className="mb-2">Select a Feature</Label>
        <Select
          disabled={loading || error}
          onValueChange={(val) => {
            setFeature(() => val);
            setVariation(() => null);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a feature" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(featuresJson)
              .filter((f) => f != 'sale')
              .map((f) => {
                return (
                  <SelectItem
                    value={f}
                    className="text-blue-700 focus:bg-blue-700 focus:text-white font-medium"
                  >
                    {f}
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>
      </div>
      {feature && (
        <div className="mt-3">
          <VariationInfoSim
            label="current"
            variation={featureState[country][feature].served.key}
          />
          {/* current variation is: {featureState[country][feature].served.key} */}
        </div>
      )}
      {feature && (
        <div className="mt-4">
          <Label className="mb-2">Select new variation</Label>
          <Select
            disabled={loading || error}
            onValueChange={(val) => {
              setVariation(() => val);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select new variation" />
            </SelectTrigger>
            <SelectContent>
              {featuresJson[feature].variations
                .filter((v) => {
                  return v.key != featureState[country][feature].served.key;
                })
                .map((v) => {
                  return <SelectItem value={v.key}>{v.key}</SelectItem>;
                })}
            </SelectContent>
          </Select>
        </div>
      )}
      {variation && (
        <>
          <div className="mt-3">
            <VariationInfoSim label="new" variation={variation} />
          </div>
          <Button
            disabled={loading || error}
            onClick={() => handleAction({ feature, variation })}
            className="bg-blue-700 mt-3"
          >
            Confirm Change
          </Button>
        </>
      )}
    </Card>
  );
}
