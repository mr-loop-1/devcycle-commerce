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
}
