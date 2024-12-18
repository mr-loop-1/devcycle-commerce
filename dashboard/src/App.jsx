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
import ApiKeyInput from './components/ApiKeyInput';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [apiKeyError, setApiKeyError] = useState(null);
  const [hasValidApikey, setHasValidApiKey] = useState(false);

  const [loading, setLoading] = useState(false);
  // this loading is only for api key and project setup

  const [targetState, setTargetState] = useState(null);
  const [projectKey, setProjectKey] = useState(null);
  const [variationIds, setVariationIds] = useState(null);
  const [featureState, setFeatureState] = useState(null);

  // true only after above all are setup
  const [remoteSetup, setRemoteSetup] = useState(false);
  const [remoteSetupError, setRemoteSetupError] = useState(null);

  const [panel, setPanel] = useState('control');

  const handleReset = () => {
    setApiKeyError(() => null);
    setHasValidApiKey(() => false);
    setApiKey(() => null);
  };

  const storeApiKey = async () => {
    setApiKeyError(() => null);
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
  // this should be done in

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
        {apiKeyError && <div className="text-red-900">{apiKeyError}</div>}
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
            />
          </div>
          {remoteSetup && (
            <div className="">
              <div id="project-info">
                using project "{projectKey}" in environment "production"
              </div>
              <div id="switch-mode" className="">
                Control
              </div>
              <div id="panel" className="">
                {mode == 'control' && (
                  <ControlPanel
                    apiKey={apiKey}
                    projectKey={projectKey}
                    variationIds={variationIds}
                    featureState={featureState}
                    targetState={targetState}
                    setFeatureState={setFeatureState}
                    setTargetState={setTargetState}
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
