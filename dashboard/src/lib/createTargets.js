import { createTargetsApi } from '@/api/devcycle';
import featuresJson from './../../data/features.json';
import targetsJson from './../../data/targets.json';

export default async function createTargets(apiKey, projectKey, variationIds) {
  const preparedData = prepareTargets(variationIds);
  const targetsData = {};

  preparedData.forEach(async (data) => {
    const targetData = await createTargetsApi(
      apiKey,
      projectKey,
      data.key,
      data.targets
    );
    targetsData[data.key] = targetData.targets;
  });

  // this is the data passed to control's api calls to change variation
  return targetsData;
}

const prepareTargets = (variationIds) => {
  return Object.keys(featuresJson).map((featureKey) => {
    return {
      key: featureKey,
      targets: targetsJson.map((target) => {
        return {
          distribution: {
            percentage: 1,
            _variation:
              variationIds[
                target.features.find(
                  (f) => f.key == featuresJson[featureKey].key
                ).serve
              ],
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
