import featuresJson from './../../../data/features.json';
import VariationsJson from './../../../data/variations.json';
import { config } from '../../../config/config';
import VariationInfo from './variationInfo';

export default function FeatureHistory({ history }) {
  return (
    <div>
      <div>
        in country {config.countries[history.country.key]}, feature{' '}
        {history.feature.key} changed from {history.oldVariation.key} to{' '}
        {history.newVariation.key}
        <div className="flex">
          <VariationInfo label="old" variation={history.oldVariation.key} />
          <div className="ml-10">
            <VariationInfo
              label="current"
              variation={history.newVariation.key}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
