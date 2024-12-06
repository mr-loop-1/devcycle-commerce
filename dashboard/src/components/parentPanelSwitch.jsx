import { useEffect, useState } from 'react';
import InitButton from './InitButton';
import setFeatures from '@/lib/setFeatureState';

export default function ParentPanelSwitch({ apiKey }) {
  const [targetState, setTargetState] = useState(null);
  const [mode, setMode] = useState('control');
  const [projectKey, setProjectKey] = useState(null);
  const [variationIds, setVariationIds] = useState(null);

  const [remoteSetup, setRemoteSetup] = useState(false);
  const [featureState, setFeatureState] = useState(null);

  useEffect(() => {
    setFeatureState(() => setFeatures());
  });

  return (
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
            {/* {mode == 'control' && <ControlPanel />} */}
          </div>
        </div>
      )}
    </div>
  );
}
