import { useState } from 'react';
import StateAction from './StateAction';
import FeatureHistory from './featureActions/featureHistory';
import FeatureAction from './featureActions/FeatureAction';

export default function ControlPanel({
  apiKey,
  featureState,
  targetState,
  variationIds,
  projectKey,
}) {
  // this component controls the normal api actions
  const [stream, setStream] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAction = async (data) => {
    setLoading(() => true);
    setStream(() => [...stream, data]);

    setLoading(() => false);
  };

  return (
    <div>
      {stream.forEach((history) => {
        return <FeatureHistory history={history} />;
      })}
      {loading ? <FeatureAction /> : 'under process'}
    </div>
  );
}
