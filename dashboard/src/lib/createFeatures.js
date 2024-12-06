import {
  createFeaturesApi,
  createTargetsApi,
  listEnvironmentsApi,
} from '@/api/devcycle';
import featuresJson from './../../data/features.json';
import targetsJson from './../../data/targets.json';
import config from './../../config/config';

export default async function createFeatures({ apiKey, projectKey }) {
  const featuresData = await createFeaturesApi(
    apiKey,
    projectKey,
    featuresJson
  );

  return featuresData;

  const targets = prepareTargets(data);
  targets.forEach(async (target) => {
    await createTargetsApi(apiKey, project.key, target.key, target.targets);
  });
  return data;
}

const prepareTargets = () => {
  return Object.keys(featuresJson).map((featureKey) => {
    return {
      key: featureKey,
      targets: targetsJson.map((target) => {
        return {
          distribution: {
            percentage: 1,
            _variation: target.features.find(
              (f) => f.key == featuresJson[featureKey].key
            ).serve,
          },
          audience: {
            name: config.countries[target.country],
            filters: {
              operator: 'and',
              filters: [
                {
                  type: 'user',
                  subType: 'all',
                  compare: '=',
                  values: [target.country.toUpperCase()],
                },
              ],
            },
          },
        };
      }),
    };
  });
};
