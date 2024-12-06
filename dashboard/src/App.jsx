import { useState } from 'react';
import './App.css';
import { Card } from './components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from './components/ui/button';
import { checkApiKey } from './api/devcycle';
import { LoadingSpinner } from './components/Spinner';
import Mode from './components/Mode';
import ParentPanelSwitch from './components/parentPanelSwitch';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [hasValidApikey, setHasValidApiKey] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // on every init create a new project with full state
  const [baseProject, setBaseProject] = useState(null);
  const [baseFeatures, setBaseFeatures] = useState(null);

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
          <ParentPanelSwitch apiKey={apiKey} />
        </div>
      )}
    </Card>
  );
}

export default App;
