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
import Reference from './components/Reference';
import { useToast } from '@/hooks/use-toast';
import showToast from './components/errorToast';
import InfoBox from './components/ProjectInfo';
import State from './components/State';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [hasValidApikey, setHasValidApiKey] = useState(false);
  // apiInitError, apiError, serverError, dataError, unknownError
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

  const { toast } = useToast();

  const handleReset = () => {
    setError(() => null);
    setHasValidApiKey(() => false);
    setApiKey(() => '');
  };

  const storeApiKey = async () => {
    setError(() => null);
    setLoading(() => true);
    const response = await checkApiKey(apiKey);
    if (response.type == 'success') {
      setHasValidApiKey(() => true);
    } else {
      showToast(toast, 'apiInitError');
      setError(() => 'apiInitError');
    }
    setLoading(() => false);
  };

  useEffect(() => {
    setFeatureState(() => setFeatures());
  }, []);
  // this should be done in the init button step

  // I need to make hasValidaApi key false on server and unkown errors too

  return (
    <div>
      <Card className="mx-6 mt-6 pt-6 px-6  md:mx-14 lg:mx-auto max-auto lg:max-w-2xl mb-40 pb-40">
        <div id="header" className="flex justify-between mb-6">
          <img
            className="inline cursor-pointer"
            src="/logo.png"
            width={40}
            height={40}
          />
          <span className="">:love by Abdul Samad</span>
        </div>
        <div id="api-input">
          <div className="flex justify-between">
            <Input
              className="mr-2"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={loading || hasValidApikey}
              placeholder="Enter the Api Key"
            />
            {hasValidApikey ? (
              <Button className="bg-red-700" onClick={handleReset}>
                Reset
              </Button>
            ) : (
              <Button
                className="bg-blue-700"
                onClick={storeApiKey}
                disabled={loading}
              >
                {loading ? <LoadingSpinner /> : 'Store Api Key'}
              </Button>
            )}
          </div>
          <div id="api-info" className="mt-2">
            {hasValidApikey && (
              <span className="text-lime-700 text-sm font-semibold">
                api key verified successfully
              </span>
            )}
            {error == 'apiInitError' && (
              <span className="text-red-700 text-sm font-semibold">
                api key is invalid or expired
              </span>
            )}
            {error == 'apiError' && (
              <span className="text-red-700 text-sm font-semibold">
                api key is invalid or expired
              </span>
            )}
          </div>
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
              <div id="main-box">
                <div id="project-info" className="my-2">
                  <InfoBox projectKey={projectKey} />
                </div>
                <div id="switch-mode" className="mt-6">
                  <PanelSwitch panel={panel} setPanel={setPanel} />
                  <hr className="mt-1 bg-stone-300" />
                </div>
                <div id="panel" className="mt-6">
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
      <Reference />
      <State featureState={featureState} />
    </div>
  );
}

export default App;
