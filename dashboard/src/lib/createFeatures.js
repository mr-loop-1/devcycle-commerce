import { createFeaturesApi } from '@/api/devcycle';
import featuresJson from './../../data/features.json';

export default async function createFeatures({ apiKey, projectKey }) {
  const featuresData = await createFeaturesApi(
    apiKey,
    projectKey,
    featuresJson
  );

  return featuresData;
}
