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
    <div className="mt-4">
      <Button
        className="bg-blue-700"
        onClick={handleSetup}
        disabled={remoteSetup || loading || error == 'apiError'}
      >
        Setup Devcycle Project {loading && <LoadingSpinner />}
      </Button>
      <div className="mt-2 mb-4">
        {loading && (
          <span className="text-blue-700 text-sm font-semibold">
            Creating project...
            <br />
            Creating features, variables, variations
            <br />
            Applying defaults
          </span>
        )}
        {remoteSetup && (
          <span className="text-lime-700 text-sm font-semibold">
            devcycle setup successfully
          </span>
        )}
        {error == 'dataError' && (
          <span className="text-red-700 text-sm font-semibold">
            There seems to be some problem synchornising the features with
            devcycle. The data is found to be out-of-order or invalid
          </span>
        )}
      </div>
    </div>
  );
}
