import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Card } from './components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from './components/ui/button';
import { checkApiKey } from './api/devcycle';
import { LoadingSpinner } from './components/Spinner';

function App() {
  const [apiKey, setApiKey] = useState(null);
  const [hasApikey, setHasApiKey] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleResetApi = () => {
    setApiKey(() => null);
  };

  const handleSetApi = async () => {
    setError(() => '');
    setLoading(() => true);
    const isKeyValid = await checkApiKey(apiKey);
    console.log('🚀 ~ handleSetApi ~ isKeyValid:', isKeyValid);
    if (isKeyValid) {
      setHasApiKey(() => true);
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
        {hasApikey ? (
          <Button variant="destructive">Reset</Button>
        ) : (
          <Button className="w-24" onClick={handleSetApi} disabled={loading}>
            {loading ? <LoadingSpinner /> : 'Check'}
          </Button>
        )}
      </div>
      {error && <div className="text-red-900">{error}</div>}
    </Card>
  );
}

export default App;
