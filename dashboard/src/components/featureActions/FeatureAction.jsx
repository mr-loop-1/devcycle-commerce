export default function FeatureAction({ countries, setError }) {
  const [currentCountryIdx, setCurrentCountryIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(() => true);
    // get all flags for all countries
    // normalize them
    setLoading(() => false);
  });

  return (
    <div>
      {loading ? (
        <div className="text-green-600">Fetching Flag States</div>
      ) : (
        <div className="flex">{countries.map}</div>
      )}
    </div>
  );
}
