export default function setVariations(featuresData) {
  const obj = {};
  featuresData.forEach((feature) => {
    feature.variations.forEach((variation) => {
      obj[variation.key] = variation._id;
    });
  });
  return obj;
}
