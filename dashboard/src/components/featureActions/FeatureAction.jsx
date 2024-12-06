import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { config } from '../../../config/config';
import featuresJson from './../../data/features.json';
import VariationsJson from './../../data/variations.json';
import { Button } from '../ui/button';

export default function FeatureAction({ featureState, loading, handleSubmit }) {
  const [country, setCountry] = useState(null);
  const [feature, setFeature] = useState(null);
  const [variation, setVariation] = useState(null);

  return (
    <div>
      <Select disabled={loading}>
        <SelectTrigger>
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          {config.countriesArray.map((c) => {
            return (
              <SelectItem
                value={c}
                onClick={(e) => {
                  setCountry(() => e.target.value);
                  setFeature(() => null);
                  setVariation(() => null);
                }}
              >
                config.countries[c]
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {country && (
        <Select disabled={loading}>
          <SelectTrigger>
            <SelectValue placeholder="Select a feature" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(featuresJson).map((f) => {
              return (
                <SelectItem
                  value={f}
                  onClick={(e) => {
                    setFeature(() => e.target.value);
                    setVariation(() => null);
                  }}
                >
                  {f}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      )}
      {feature && <div>current variation is: </div>}
      {feature && (
        <Select disabled={loading}>
          <SelectTrigger>
            <SelectValue placeholder="Select new variation" />
          </SelectTrigger>
          <SelectContent>
            {featuresJson[feature].variations
              .filter((v) => v.key != featureState[country][feature].served.key)
              .map((v) => {
                return (
                  <SelectItem
                    value={v.key}
                    onClick={(e) => setFeature(() => e.target.value)}
                  >
                    {v.key}
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>
      )}
      {variation && (
        <>
          <div className="">New variation is:</div>
          <Button
            disabled={loading}
            onClick={() => {
              handleSubmit({ country, feature, variation });
            }}
          >
            Submit
          </Button>
        </>
      )}
    </div>
  );
}
