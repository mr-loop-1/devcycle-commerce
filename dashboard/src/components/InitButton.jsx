import { useState } from 'react';
import { Button } from './ui/button';
import { LoadingSpinner } from './Spinner';

export default function InitButton({
  remoteSetup,
  setRemoteSetup,
  setTargets,
  setProject,
  apiKey,
}) {
  const [loading, setLoading] = useState(false);
  const handleSetup = () => {
    try {
      setLoading(() => true);
      // call to create project, create flags etc
      // also the call to set target ids
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
