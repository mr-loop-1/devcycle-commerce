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
    <div>
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
            return <SelectItem value={c}>{config.countries[c]}</SelectItem>;
          })}
        </SelectContent>
      </Select>
      {country && (
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
              return <SelectItem value={f}>{f}</SelectItem>;
            })}
          </SelectContent>
        </Select>
      )}
      {feature && (
        <div>
          <VariationInfo
            label="current"
            variation={featureState[country][feature].served.key}
          />
          {/* current variation is: {featureState[country][feature].served.key} */}
        </div>
      )}
      {feature && (
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
      )}
      {variation && (
        <>
          <div className="">New variation is: {variation}</div>
          <Button
            disabled={loading || error}
            onClick={() => handleAction({ country, feature, variation })}
          >
            Submit
          </Button>
        </>
      )}
    </div>
  );
}
