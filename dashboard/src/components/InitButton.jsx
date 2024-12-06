import { useState } from 'react';
import { Button } from './ui/button';
import { LoadingSpinner } from './Spinner';
import createFeatures from '@/lib/createFeatures';
import createProject from '@/lib/createProject';
import setVariations from '@/lib/setVariations';
import createTargets from '@/lib/createTargets';

export default function InitButton({
  remoteSetup,
  varitionIds,
  setRemoteSetup,
  setTargetState,
  setProjectKey,
  setVariationIds,
  apiKey,
}) {
  const [loading, setLoading] = useState(false);
  const handleSetup = async () => {
    try {
      setLoading(() => true);
      const projectKey = await createProject({ apiKey });
      setProjectKey(() => projectKey);
      // const featuresData = await createFeatures({ apiKey, projectKey });
      // setVariationIds(() => setVariations(featuresData));

      // const targetsData = await createTargets(apiKey.projectKey, varitionIds);
      // setTargetState(() => targetsData);

      setRemoteSetup(() => true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(() => false);
    }
  };

  return (
    <div>
      <Button onClick={handleSetup} disabled={remoteSetup || loading}>
        Setup Devcycle Project {loading && <LoadingSpinner />}
      </Button>
      {remoteSetup && <div>Setup successful</div>}
    </div>
  );
}
