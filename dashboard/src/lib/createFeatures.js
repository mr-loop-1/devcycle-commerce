import { createFeaturesApi } from '@/api/devcycle';
import featuresJson from './../../data/features.json';

export default async function createFeatures({ apiKey, projectKey }) {
  const response = await createFeaturesApi(
    apiKey,
    projectKey,
    Object.values(featuresJson)
  );

  return response;
}
