import targetsCommonJson from './../../data/targets-common.json';
import { config } from './../../config/config';

export default async function setFeatures() {
  const obj = {};

  config.countriesArray.map((country) => {
    obj[country] = targetsCommonJson;
  });

  return obj;
}
