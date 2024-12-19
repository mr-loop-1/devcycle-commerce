export default function InfoBox({ projectKey }) {
  return (
    <div className="flex flex-col font-semibold">
      <span className="self-center">
        project key:{' '}
        <span className="text-blue-800 font-mono">{projectKey}</span>
      </span>
      <span className="self-center">
        environment: <span className="text-blue-800 font-mono">production</span>
      </span>
    </div>
  );
}
