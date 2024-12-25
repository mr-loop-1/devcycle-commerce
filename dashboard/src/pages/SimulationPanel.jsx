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

import variationJson from './../../data/variations.json';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ChartHistory from '@/components/simulation/ChartHistory';
import Charts from '@/components/simulation/Charts';

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
  const [queryIndices, setQueryIndices] = useState([]);
  const [queryIdx, setQueryIdx] = useState(0);
  const [queries, setQueries] = useState({
    idx: 0,
    status: 1,
  });

  const [stream, setStream] = useState([]);
  const [chartStream, setChartStream] = useState([]);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState('init'); // init, ready, start, over, reset

  const [charts, setCharts] = useState(chartsJson);

  const nextIdx = (queryIndices) => {
    const numSet = new Set(queryIndices);
    let i = 0;
    while (numSet.has(i)) {
      i++;
    }
    return i;
  };

  const applyEffects = (queryIdx, queryIndices) => {
    for (let i; i != queriesJson.length; i++) {
      if (queryIdx == i) continue;
    }
  };

  const processQuery = (data, newFeatureState) => {
    /*
    check the current query and see if it is impacted by the change
    effects will happen for all charts, exept the current query target chart
    */

    const newVariableValue =
      variationJson[data.newVariation].variables[
        queriesJson[queryIdx].variable
      ];

    if (
      queriesJson[queryIdx].feature == data.feature.key &&
      !queriesJson[queryIdx].flow.required.includes(newVariableValue)
    ) {
      // query can be removed and has been atm done in terms of flow

      const newQueryIndices = [...queryIndices, queryIdx];
      let newQueryIdx = nextIdx(tempQueryIndices);

      let tempQueryIndices = [...newQueryIndices];
      let tempQueryIdx = newQueryIdx;

      if (tempQueryIdx != queriesJson.len) {
        let tempVariableValue =
          variationJson[
            newFeatureState[country][queriesJson[tempQueryIdx].feature].served
              .key
          ].variables[queriesJson[tempQueryIdx].variable];

        while (
          tempQueryIdx != queriesJson.len &&
          !queriesJson[tempQueryIdx].flow.required.includes(tempVariableValue)
        ) {
          tempQueryIndices.push(tempQueryIdx);
          tempQueryIdx = nextIdx(tempQueryIndices);
        }
        newQueryIdx = tempQueryIdx;
      }

      applyEffects(newQueryIdx, newQueryIndices);

      setQueryIdx(() => newQueryIdx);
      setQueryIndices(() => newQueryIndices);
    } else {
      applyEffects(queryIdx, queryIndices);
    }
  };

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

      processQuery(data, newFeatureState);
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
      <div className="">
        {(status == 'init' || status == 'reset') && (
          <Button className="" onClick={() => setStatus(() => 'ready')}>
            Initialize defaults
          </Button>
        )}
        {status == 'ready' && (
          <Button onClick={() => setStatus(() => 'start')} className="">
            Start
          </Button>
        )}
        {(status == 'start' || status == 'over') && (
          <Button className="" onClick={() => setStatus(() => 'reset')}>
            Reset
          </Button>
        )}
      </div>

      {['start', 'over'].includes(status) && (
        <div id="main-simulation-pane">
          <div className="">
            {stream.map((history, i) => {
              return (
                <div className="">
                  <FeatureHistory history={history} key={i} />
                  <ChartHistory history={chartStream[i]} />
                </div>
              );
            })}
          </div>
          <hr className="my-4" />
          <div className="w-[90%] mx-auto">
            <Charts />
          </div>
          {/* <ProfitsChart /> */}
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
          )}{' '}
        </div>
      )}
    </div>
  );
}
