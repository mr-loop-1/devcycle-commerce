export default function InfoBox({ projectKey }) {
  return (
    <div className="flex flex-col font-semibold">
      <span className="self-center">
        project key:{' '}
        <span className="text-blue-700 font-mono">{projectKey}</span>
      </span>
      <span className="self-center">
        environment:{' '}
        <span className="text-blue-700 font-mono">development</span>
      </span>
      <span className="self-center font-medium text-sm">
        if using with frontend, please cross-check the project key
      </span>
    </div>
  );
}
