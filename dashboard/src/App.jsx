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

function App() {
  const [apiKey, setApiKey] = useState('');
  const [hasValidApikey, setHasValidApiKey] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [targetState, setTargetState] = useState(null);
  const [mode, setMode] = useState('control');
  const [projectKey, setProjectKey] = useState(null);
  const [variationIds, setVariationIds] = useState(null);

  const [remoteSetup, setRemoteSetup] = useState(false);
  const [featureState, setFeatureState] = useState(null);

  const handleReset = () => {
    setHasValidApiKey(() => null);
    setApiKey(() => null);
  };

  const handleSet = async () => {
    setError(() => '');
    setLoading(() => true);
    const isKeyValid = await checkApiKey(apiKey);
    if (isKeyValid) {
      setHasValidApiKey(() => true);
    } else {
      setError('Api Key is Invalid or Expired');
    }
    setLoading(() => false);
  };

  useEffect(() => {
    setFeatureState(() => setFeatures());
  }, []);

  return (
    <Card className="mx-6 mt-6 pt-6 px-6 h-screen md:mx-14 lg:mx-auto max-auto lg:max-w-2xl">
      <div className="flex justify-between">
        <Input
          className=""
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          disabled={loading}
        />
        {hasValidApikey ? (
          <Button variant="destructive" onClick={handleReset}>
            Reset
          </Button>
        ) : (
          <Button className="w-24" onClick={handleSet} disabled={loading}>
            {loading ? <LoadingSpinner /> : 'Check'}
          </Button>
        )}
      </div>
      {error && <div className="text-red-900">{error}</div>}
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
