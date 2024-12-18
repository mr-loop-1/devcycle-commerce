import { useEffect, useState } from 'react';
import './App.css';
import { Card } from './components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from './components/ui/button';
import { checkApiKey } from './api/devcycle';
import { LoadingSpinner } from './components/Spinner';
import PanelSwitch from './components/PanelSwitch';
import ControlPanel from './pages/ControlPanel';
import InitButton from './components/InitButton';
import setFeatures from './lib/setFeatureState';
import SimulationPanel from './pages/SimulationPanel';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [hasValidApikey, setHasValidApiKey] = useState(false);
  const [error, setError] = useState(null);

  // this loading is only for api key and project setup
  const [loading, setLoading] = useState(false);

  const [targetState, setTargetState] = useState(null);
  const [projectKey, setProjectKey] = useState(null);
  const [variationIds, setVariationIds] = useState(null);
  const [featureState, setFeatureState] = useState(null);

  // true only after above all are setup
  const [remoteSetup, setRemoteSetup] = useState(false);
  const [remoteSetupError, setRemoteSetupError] = useState(null);

  const [panel, setPanel] = useState('control');

  const handleReset = () => {
    setError(() => null);
    setHasValidApiKey(() => false);
    setApiKey(() => null);
  };

  const storeApiKey = async () => {
    setError(() => null);
    setLoading(() => true);
    const isKeyValid = await checkApiKey(apiKey);
    if (isKeyValid) {
      setHasValidApiKey(() => true);
    } else {
      setApiKeyError('Api Key is Invalid or Expired');
    }
    setLoading(() => false);
  };

  useEffect(() => {
    setFeatureState(() => setFeatures());
  }, []);
  // this should be done in the init button step

  return (
    <Card className="mx-6 mt-6 pt-6 px-6 h-screen md:mx-14 lg:mx-auto max-auto lg:max-w-2xl">
      <div id="api-input">
        <div className="flex justify-between">
          <Input
            className=""
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            disabled={loading || hasValidApikey}
          />
          {hasValidApikey ? (
            <Button variant="destructive" onClick={handleReset}>
              Reset
            </Button>
          ) : (
            <Button className="w-24" onClick={storeApiKey} disabled={loading}>
              {loading ? <LoadingSpinner /> : 'Check'}
            </Button>
          )}
        </div>
        {error == 'apiInit' && (
          <div className="text-red-900">Invalid Api Key</div>
        )}
        {error == 'apiRuntime' && (
          <div>
            Your Api key has expired, please reset the key and setup a new
            project
          </div>
        )}
      </div>
      {hasValidApikey && (
        <div>
          <div id="init">
            <InitButton
              remoteSetup={remoteSetup}
              variationIds={variationIds}
              setRemoteSetup={setRemoteSetup}
              setTargetState={setTargetState}
              setProjectKey={setProjectKey}
              setVariationIds={setVariationIds}
              apiKey={apiKey}
              error={error}
              setError={setError}
            />
          </div>
          {remoteSetup && (
            <div>
              <div id="project-info">
                using project "{projectKey}" in environment "production"
              </div>
              <div id="switch-mode" className="">
                <PanelSwitch />
              </div>
              <div id="panel" className="">
                {panel == 'control' ? (
                  <ControlPanel
                    apiKey={apiKey}
                    projectKey={projectKey}
                    variationIds={variationIds}
                    featureState={featureState}
                    targetState={targetState}
                    setFeatureState={setFeatureState}
                    setTargetState={setTargetState}
                    error={error}
                    setError={setError}
                  />
                ) : (
                  <SimulationPanel
                    apiKey={apiKey}
                    projectKey={projectKey}
                    variationIds={variationIds}
                    featureState={featureState}
                    targetState={targetState}
                    setFeatureState={setFeatureState}
                    setTargetState={setTargetState}
                    error={error}
                    setError={setError}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default App;
