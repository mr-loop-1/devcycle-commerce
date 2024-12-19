import { useState } from 'react';
import { Button } from './ui/button';
import { LoadingSpinner } from './Spinner';
import createFeatures from '@/lib/createFeatures';
import createProject from '@/lib/createProject';
import setVariations from '@/lib/setVariations';
import createTargets from '@/lib/createTargets';
import showToast from './errorToast';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const handleSetup = async () => {
    try {
      setLoading(() => true);
      setError(() => null);

      const projectKeyResponse = await createProject({ apiKey });
      if (projectKeyResponse.type != 'success') {
        showToast(toast, projectKeyResponse.type);
        setError(() => projectKeyResponse.type);
      }
      setProjectKey(() => projectKeyResponse.data);
      const featuresDataResponse = await createFeatures({
        apiKey,
        projectKey: projectKeyResponse.data,
      });
      if (featuresDataResponse.type != 'success') {
        showToast(toast, featuresDataResponse.type);
        setError(() => featuresDataResponse.type);
      }
      const variationIds = setVariations(featuresDataResponse.data);

      setVariationIds(() => variationIds);

      const targetsDataResponse = await createTargets(
        apiKey,
        projectKeyResponse.data,
        variationIds
      );
      if (targetsDataResponse.type != 'success') {
        showToast(toast, targetsDataResponse.type);
        setError(() => targetsDataResponse.type);
      }
      setTargetState(() => targetsDataResponse.data);

      setRemoteSetup(() => true);
    } catch (err) {
      showToast(toast, 'unknownError');
      setError(() => 'unknownError');
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
      {error == 'dataError' && (
        <div>
          There seems to be some problem synchornising the features with
          devcycle. The data is found to be out-of-order or invalid
        </div>
      )}
    </div>
  );
}
