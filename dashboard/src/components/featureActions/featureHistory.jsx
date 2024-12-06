import featuresJson from './../../data/features.json';
import VariationsJson from './../../data/variations.json';
import { config } from '../../../config/config';

export default function FeatureHistory({ history }) {
  return (
    <div>
      {history.map((data) => {
        return (
          <div>
            in country {config.countries[data.country.key]}, feature{' '}
            {data.feature.key} changed from {data.oldVariation.key} to{' '}
            {data.newVariation.key}
          </div>
        );
      })}
    </div>
  );
}
