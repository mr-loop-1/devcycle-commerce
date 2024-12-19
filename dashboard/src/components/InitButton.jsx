import { useState } from 'react';
import { Button } from './ui/button';
import { LoadingSpinner } from './Spinner';
import createFeatures from '@/lib/createFeatures';
import createProject from '@/lib/createProject';
import setVariations from '@/lib/setVariations';
import createTargets from '@/lib/createTargets';

export default function InitButton({
  remoteSetup,
  setRemoteSetup,
  setTargetState,
  setProjectKey,
  setVariationIds,
  apiKey,
  error,
  setError,
}) {
  const [loading, setLoading] = useState(false);
  const handleSetup = async () => {
    try {
      setLoading(() => true);
      setError(() => null);

      const projectKey = await createProject({ apiKey });
      setProjectKey(() => projectKey);
      const featuresData = await createFeatures({ apiKey, projectKey });

      const variationIds = setVariations(featuresData);

      setVariationIds(() => variationIds);

      const targetsData = await createTargets(apiKey, projectKey, variationIds);
      setTargetState(() => targetsData);

      setRemoteSetup(() => true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(() => false);
    }
  };

  // highlight the button if error is dataError
  return (
    <div>
      <Button
        onClick={handleSetup}
        disabled={remoteSetup || loading || error == 'apiError'}
      >
        Setup Devcycle Project {loading && <LoadingSpinner />}
      </Button>
      {remoteSetup && <div>Setup successful</div>}
    </div>
  );
}
