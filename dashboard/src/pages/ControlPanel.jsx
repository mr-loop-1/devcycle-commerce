import { useState } from 'react';
import { createTargetsApi } from '@/api/devcycle';
import FeatureAction from '@/components/featureActions/FeatureAction';
import FeatureHistory from '@/components/featureActions/featureHistory';
import ErrorTab from '@/components/ErrorTab';
import { useToast } from '@/hooks/use-toast';
import showToast from '@/components/errorToast';
import State from '@/components/State';
import Reference from '@/components/Reference';

export default function ControlPanel({
  apiKey,
  featureState,
  setFeatureState,
  targetState,
  setTargetState,
  variationIds,
  projectKey,
  error,
  setError,
}) {
  const [stream, setStream] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAction = async (rawData) => {
    try {
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

      const response = await createTargetsApi(
        apiKey,
        projectKey,
        data.feature.key,
        newTargetState[data.feature.key]
      );

      if (response.type == 'success') {
        setFeatureState(() => newFeatureState);
        setTargetState(() => newTargetState);
        setStream((oldStream) => [...oldStream, data]);
      } else {
        showToast(toast, response.type);
        setError(() => response.type);
      }
    } catch (err) {
      console.error(err);
      showToast(toast, 'unknownError');
      setError(() => 'unknownError');
    } finally {
      setLoading(() => false);
    }
  };

  return (
    <div>
      {stream.map((history, i) => {
        return <FeatureHistory history={history} key={i} />;
      })}
      <hr className="my-4" />

      <div className="flex justify-center mt-5">
        <State featureState={featureState} />
        <span className="ml-2">
          <Reference />
        </span>
      </div>

      <FeatureAction
        handleAction={handleAction}
        featureState={featureState}
        loading={loading}
        error={error}
        key={stream.length}
      />

      {loading && 'under process'}
      {error && (
        <div>
          <ErrorTab error={error} />
        </div>
      )}
    </div>
  );
}
// the loading has to be handled inside feature actions and not here
// it should be done in a way that makes it seamless to change from a pending action to history
