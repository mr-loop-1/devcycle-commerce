import { useState } from 'react';
import { createTargetsApi } from '@/api/devcycle';
import FeatureAction from '@/components/featureActions/FeatureAction';
import FeatureHistory from '@/components/featureActions/featureHistory';

export default function ControlPanel({
  apiKey,
  featureState,
  setFeatureState,
  targetState,
  setTargetState,
  variationIds,
  projectKey,
}) {
  const [stream, setStream] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAction = async (rawData) => {
    setLoading(() => true);

    const data = {
      country: {
        key: rawData.country,
      },
      feature: {
        key: rawData.feature,
      },
      newVariation: {
        key: rawData.variation,
      },
      oldVariation: {
        key: featureState[rawData.country][rawData.feature].served.key,
      },
    };

    // change both feature state and target state and using target state change the api too;
    const newFeatureState = structuredClone(featureState);
    newFeatureState[data.country.key][data.feature.key].served.key =
      data.newVariation.key;

    const newTargetState = structuredClone(targetState);
    const idx = newTargetState[data.feature.key].findIndex((target) => {
      return (
        target.audience.filters.filters[0].values[0] ==
        data.country.key.toUpperCase()
      );
    });

    newTargetState[data.feature.key][idx].distribution[0]._variation =
      variationIds[data.newVariation.key];

    const targetData = await createTargetsApi(
      apiKey,
      projectKey,
      data.feature.key,
      newTargetState[data.feature.key]
    );

    setFeatureState(() => newFeatureState);
    setTargetState(() => newTargetState);
    setStream((oldStream) => [...oldStream, data]);

    setLoading(() => false);
  };

  return (
    <div>
      {stream.map((history) => {
        return <FeatureHistory history={history} />;
      })}
      {loading ? (
        'under process'
      ) : (
        <FeatureAction
          handleAction={handleAction}
          featureState={featureState}
          loading={loading}
        />
      )}
    </div>
  );
}
