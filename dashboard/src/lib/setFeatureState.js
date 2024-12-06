import targetsCommon from './../../data/targets-common.json';
import config from './../../config/config';

export default async function setFeatures() {
  const obj = {};

  config.countriesArray.map((country) => {
    obj[country] = targetsCommon;
  });

  return obj;
}
