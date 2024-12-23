import { useEffect, useState } from 'react';
import { createTargetsApi } from '@/api/devcycle';
import FeatureAction from '@/components/featureActions/FeatureAction';
import FeatureHistory from '@/components/featureActions/featureHistory';
import SimulationStart from '@/components/simulation/simulationStart';
import { Button } from '@/components/ui/button';

import queriesJson from './../../data/queries.json';
import chartsJson from './../../data/charts.json';

import Reference from '@/components/Reference';
import State from '@/components/State';
import SalesChart from '@/components/charts/Sales';
import { ProfitsChart } from '@/components/charts/Profits';

export default function SimulationPanel({
  apiKey,
  featureState,
  setFeatureState,
  targetState,
  setTargetState,
  variationIds,
  projectKey,
  error,
  setError,
}) {
  // const [start, setStart] = useState(true);

  // const [timeLeft, setTimeLeft] = useState(10); // Timer starts at 120 seconds (2 minutes)
  // const [isRunning, setIsRunning] = useState(false);
  // const [gameOver, setGameOver] = useState(false);

  // // Function to start the timer when the button is clicked
  // const startTimer = () => {
  //   setIsRunning(true);
  //   setGameOver(false);
  // };

  // // Function to stop the timer (e.g., when the game is won or lost)
  // const stopTimer = () => {
  //   setIsRunning(false);
  // };

  // // Function to reset the timer
  // const resetTimer = () => {
  //   setTimeLeft(10); // Reset to 2:00
  //   setIsRunning(false);
  //   setGameOver(false);
  // };

  // // Timer countdown logic using useEffect
  // useEffect(() => {
  //   let interval;
  //   if (isRunning && timeLeft > 0) {
  //     interval = setInterval(() => {
  //       setTimeLeft((prevTime) => prevTime - 1);
  //     }, 1000);
  //   } else if (timeLeft === 0) {
  //     setGameOver(true);
  //     stopTimer();
  //   }

  //   // Cleanup interval on unmount or when timer stops
  //   return () => clearInterval(interval);
  // }, [isRunning]);

  // // Convert timeLeft in seconds to mm:ss format
  // const formatTime = (timeInSeconds) => {
  //   const minutes = Math.floor(timeInSeconds / 60);
  //   const seconds = timeInSeconds % 60;
  //   return `${minutes < 10 ? '0' : ''}${minutes}:${
  //     seconds < 10 ? '0' : ''
  //   }${seconds}`;
  // };

  // return (
  //   <div>
  //     <h1>Game Timer</h1>
  //     <p>{formatTime(timeLeft)}</p>
  //     {gameOver ? (
  //       <p>Game Over! You lost!</p>
  //     ) : (
  //       <>
  //         <button onClick={startTimer} disabled={isRunning}>
  //           Start Timer
  //         </button>

  //         <button onClick={resetTimer}>Reset Timer</button>
  //       </>
  //     )}
  //   </div>
  // );

  // const [query, setQuery] = useState({
  //   ...queriesJson[0],
  //   status: 1,
  // });
  const [stream, setStream] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [charts, setCharts] = useState(chartsJson);

  const handleAction = async (rawData) => {
    try {
      setLoading(() => true);

      const data = {
        country: {
          key: rawData.country,
        },
        feature: {
          key: rawData.feature,
        },
        newVariation: {
          key: rawData.variation,
        },
        oldVariation: {
          key: featureState[rawData.country][rawData.feature].served.key,
        },
      };

      // change both feature state and target state and using target state change the api too;
      const newFeatureState = structuredClone(featureState);
      newFeatureState[data.country.key][data.feature.key].served.key =
        data.newVariation.key;

      const newTargetState = structuredClone(targetState);
      const idx = newTargetState[data.feature.key].findIndex((target) => {
        return (
          target.audience.filters.filters[0].values[0] ==
          data.country.key.toUpperCase()
        );
      });

      newTargetState[data.feature.key][idx].distribution[0]._variation =
        variationIds[data.newVariation.key];

      const response = await createTargetsApi(
        apiKey,
        projectKey,
        data.feature.key,
        newTargetState[data.feature.key]
      );

      if (response.type == 'success') {
        setFeatureState(() => newFeatureState);
        setTargetState(() => newTargetState);
        setStream((oldStream) => [...oldStream, data]);
      } else {
        showToast(toast, response.type);
        setError(() => response.type);
      }
    } catch (err) {
      console.error(err);
      showToast(toast, 'unknownError');
      setError(() => 'unknownError');
    } finally {
      setLoading(() => false);
    }
  };

  return (
    <div>
      <Button>Start</Button>

      {stream.map((history, i) => {
        return <FeatureHistory history={history} key={i} />;
      })}
      <hr className="my-4" />

      <SalesChart key={stream.length} />
      <ProfitsChart />

      <div className="flex justify-center mt-5">
        <State featureState={featureState} />
        <span className="ml-2">
          <Reference />
        </span>
      </div>

      <FeatureAction
        handleAction={handleAction}
        featureState={featureState}
        loading={loading}
        error={error}
        key={stream.length}
      />

      {loading && (
        <div className="mt-4 text-center text-blue-700 font-semibold">
          processing...
        </div>
      )}
      {error && (
        <div>
          <ErrorTab error={error} />
        </div>
      )}
    </div>
  );
}
