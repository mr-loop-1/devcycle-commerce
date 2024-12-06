import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Form, FormField, FormItem, FormLabel } from '../ui/form';
import { config } from '../../../config/config';
import featuresJson from './../../data/features.json';
import VariationsJson from './../../data/variations.json';
import { Button } from '../ui/button';

export default function FeatureAction({ featureState, targetState, setError }) {
  const [country, setCountry] = useState(null);
  const [feature, setFeature] = useState(null);
  const [variation, setVariation] = useState(null);

  const form = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Select>
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
        <Select>
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
        <Select>
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
          <Button onClick={onSubmit}>Submit</Button>
        </>
      )}
    </div>
  );
}
