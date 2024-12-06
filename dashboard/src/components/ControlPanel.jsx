import { useState } from 'react';
import StateAction from './StateAction';
import FeatureHistory from './featureActions/featureHistory';
import FeatureAction from './featureActions/FeatureAction';
import { createTargetsApi } from '@/api/devcycle';

export default function ControlPanel({
  apiKey,
  featureState,
  setFeatureState,
  targetState,
  setTargetState,
  variationIds,
  projectKey,
}) {
  // this component controls the normal api actions
  const [stream, setStream] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAction = async (data) => {
    setLoading(() => true);

    // change both feature state and target state and using target state change the api too;
    const newFeatureState = { ...featureState };
    newFeatureState[data.country.key][data.feature.key].served.key =
      data.newVariation.key;

    setFeatureState(() => newFeatureState);

    const newTargetState = { ...targetState };
    const target = newTargetState[data.feature.key].find((target) => {
      return (
        target.audience.filters.filters[0].values[0] ==
        data.country.key.toUpperCase()
      );
    });
    target.distribution._variation = variationIds[data.newVariation.key];

    const targetData = await createTargetsApi(
      apiKey,
      projectKey,
      data.feature.key,
      newTargetState
    );

    setTargetState(() => newTargetState);
    setStream(() => [...stream, data]);

    setLoading(() => false);
  };

  return (
    <div>
      {stream.forEach((history) => {
        return <FeatureHistory history={history} />;
      })}
      {loading ? (
        <FeatureAction handleAction={handleAction} />
      ) : (
        'under process'
      )}
    </div>
  );
}
