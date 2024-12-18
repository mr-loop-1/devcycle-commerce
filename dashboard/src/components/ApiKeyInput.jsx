import { useEffect, useState } from 'react';

export default function ApiKeyInput({
  apiKey,
  setApiKey,
  apiKeyError,
  handleSubmit,
  handleReset,
}) {
  return (
    <div>
      <Input
        className=""
        onChange={(e) => setApiKey(e.target.value)}
        disabled={loading}
      />
      {apiKey ? (
        <Button variant="destructive" onClick={handleReset}>
          Reset
        </Button>
      ) : (
        <Button className="w-24" onClick={handleSubmit} disabled={loading}>
          {loading ? <LoadingSpinner /> : 'Check'}
        </Button>
      )}
    </div>
  );
}
