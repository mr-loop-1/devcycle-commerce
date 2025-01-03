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
import VariationInfo from './variationInfo';
import { Card } from '../ui/card';
import { Label } from '../ui/label';

export default function FeatureAction({
  featureState,
  loading,
  handleAction,
  error,
}) {
  const [country, setCountry] = useState(null);
  const [feature, setFeature] = useState(null);
  const [variation, setVariation] = useState(null);

  // outline the tab with red when error occurs
  return (
    <Card className="mt-6 py-4 md:py-8 px-4">
      <div className="text-center font-semibold">Feature Action</div>
      <div className="mt-4">
        <Select
          disabled={loading || error}
          onValueChange={(val) => {
            setCountry(() => val);
            setFeature(() => null);
            setVariation(() => null);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {config.countriesArray.map((c) => {
              return (
                <SelectItem value={c}>
                  <img
                    className="inline mr-2"
                    width={20}
                    height={20}
                    src={`/${c}.svg`}
                  />
                  {config.countries[c]}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      {country && (
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
              {Object.keys(featuresJson).map((f) => {
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
      )}
      {feature && (
        <div className="mt-3">
          <VariationInfo
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
            <VariationInfo label="new" variation={variation} />
          </div>
          <Button
            disabled={loading || error}
            onClick={() => handleAction({ country, feature, variation })}
            className="bg-blue-700 mt-3"
          >
            Confirm Change
          </Button>
        </>
      )}
    </Card>
  );
}
