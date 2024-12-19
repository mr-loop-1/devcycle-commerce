import { createTargetsApi } from '@/api/devcycle';
import featuresJson from './../../data/features.json';
import targetsCommonJson from './../../data/targets-common.json';
import { config } from './../../config/config';

export default async function createTargets(apiKey, projectKey, variationIds) {
  const preparedData = prepareTargets(variationIds);
  const targetsData = {};

  for (const data of preparedData) {
    const response = await createTargetsApi(
      apiKey,
      projectKey,
      data.key,
      data.targets
    );
    if (response.type == 'success') {
      targetsData[data.key] = response.data.targets;
    } else {
      return response;
    }
  }

  // this is the data passed to control's api calls to change variation
  return {
    type: 'success',
    data: targetsData,
  };
}

const prepareTargets = (variationIds) => {
  return Object.keys(featuresJson).map((featureKey) => {
    return {
      key: featureKey,
      targets: config.countriesArray.map((countryKey) => {
        return {
          name: config.countries[countryKey],
          distribution: [
            {
              percentage: 1,
              _variation:
                variationIds[targetsCommonJson[featureKey].served.key],
            },
          ],
          audience: {
            name: config.countries[countryKey],
            filters: {
              operator: 'and',
              filters: [
                {
                  type: 'user',
                  subType: 'country',
                  comparator: '=',
                  values: [countryKey.toUpperCase()],
                },
              ],
            },
          },
        };
      }),
    };
  });
};
