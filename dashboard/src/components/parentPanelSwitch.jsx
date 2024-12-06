import { useState } from 'react';
import InitButton from './InitButton';

export default function ParentPanelSwitch({ apiKey }) {
  // const [flagState, setFlagState] = useState(null);
  const [targets, setTargets] = useState(null);
  const [mode, setMode] = useState('control');

  const [remoteSetup, setRemoteSetup] = useState(false);
  useEffect(() => {}, []);

  // init button
  // switch
  // control panel
  // simulation panel

  return (
    <div>
      <div id="init">
        <InitButton setRemoteSetup={setRemoteSetup} setTargets={setTargets} />
      </div>
      {remoteSetup && (
        <div className="">
          <div id="switch-mode" className="">
            Control
          </div>
          <div id="panel" className="">
            {mode == 'control' && <ControlPanel />}
          </div>
        </div>
      )}
    </div>
  );
}
