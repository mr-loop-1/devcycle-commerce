import { useEffect, useState } from 'react';
import { createTargetsApi } from '@/api/devcycle';
import { Button } from '@/components/ui/button';

import queriesJson from './../../data/queries.json';
import chartsJson from './../../data/charts.json';

import Reference from '@/components/Reference';
import State from '@/components/State';
import variationJson from './../../data/variations.json';
import simulationTargets from './../../data/simulation-targets.json';

import ChartHistory from '@/components/simulation/ChartHistory';
import Charts from '@/components/simulation/Charts';
import applyChartEffects from '@/lib/applyChartEffects';
import checkQueryValidity from '@/lib/checkQueryValidity';
import Query from '@/components/simulation/Query';
import FeatureActionSim from '@/components/simulation/FeatureAction';
import FeatureHistorySim from '@/components/simulation/featureHistory';
import showToast from '@/components/errorToast';
import { useToast } from '@/hooks/use-toast';
import { useTimer } from 'react-timer-hook';
import { LoadingSpinner } from '@/components/Spinner';
import applyTopEffects from '@/lib/applyTopEffects';
import SimulationStart from '@/components/simulation/SimulationStart';
import SimState from '@/components/SimState';

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
  let time = new Date();
  const expiryTimestamp = time.setSeconds(time.getSeconds() + 300);
  const { totalSeconds, seconds, minutes, isRunning, start, pause, restart } =
    useTimer({
      expiryTimestamp,
      autoStart: false,
      onExpire: () => {
        if (!gameOver) {
          setGameOver(() => ({
            type: 'time',
          }));
          setStatus(() => 'over');
        }
      },
    });

  const [queryIndices, setQueryIndices] = useState([]);
  const [queryIdx, setQueryIdx] = useState(0);
  const [queries, setQueries] = useState([
    {
      idx: 0,
      status: 1,
    },
  ]);

  const { toast } = useToast();
  const [gameOver, setGameOver] = useState(null);
  const country = 'in';

  const [stream, setStream] = useState([]);

  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);

  const [status, setStatus] = useState('init'); // init, ready, start, over, reset

  const [charts, setCharts] = useState(chartsJson);
  const [chartStream, setChartStream] = useState([chartsJson]);

  const resetSim = () => {
    setStatus(() => 'init');
    setCharts(() => chartsJson);
    setChartStream(() => [chartsJson]);
    setStream(() => []);
    setQueryIndices(() => []);
    setQueryIdx(() => 0);
    setQueries(() => [
      {
        idx: 0,
        status: 1,
      },
    ]);
    setGameOver(() => null);
    pause();
  };

  const startSim = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 300);
    restart(time);
    setStatus(() => 'start');
  };

  const nextIdx = (queryIndices) => {
    const numSet = new Set(queryIndices);
    let i = 0;
    while (numSet.has(i)) {
      i++;
    }
    return i;
  };

  const checkSimulationStatus = (newQueryIdx, newQueries) => {
    const reasons = [];

    for (const query of newQueries) {
      if (query.status == 3) {
        // game over
        reasons.push(query.idx);
      }
    }
    if (reasons.length) {
      setStatus(() => 'over');
      setGameOver(() => ({
        type: 'severe',
        reasons: reasons,
      }));
      pause();
      return;
    }

    if (newQueryIdx >= queriesJson.length && newQueries.length == 0) {
      // game won
      setStatus(() => 'over');
      setGameOver(() => ({
        type: 'won',
      }));
      pause();
    }
  };

  const applyEffects = (newQueryIdx, data, featureState) => {
    const variablesChanged = [];
    const newVariableArray =
      variationJson[data.newVariation.key].variablesArray;
    const oldVariableArray =
      variationJson[data.oldVariation.key].variablesArray;

    for (let i = 0; i != newVariableArray.length; i++) {
      if (newVariableArray[i].value != oldVariableArray[i].value) {
        variablesChanged.push(newVariableArray[i]);
      }
    }

    const newCharts = structuredClone(charts);

    for (const variable of variablesChanged) {
      applyChartEffects(variable, newCharts, charts);
    }
    const newQueries = [];
    let existIdx;
    if (newQueryIdx < queriesJson.length) {
      newQueries.push({
        idx: newQueryIdx,
        status: 1,
      });

      existIdx = queries.findIndex((val) => val.idx == newQueryIdx);
      if (existIdx != -1) {
        newQueries[0].status = queries[existIdx].status + 1;
      }
    }

    if (newQueryIdx < queriesJson.length) {
      const queryVariableValue =
        variationJson[
          featureState[country][queriesJson[newQueryIdx].feature].served.key
        ].variables[queriesJson[newQueryIdx].variable];
      applyChartEffects(
        {
          key: queriesJson[newQueryIdx].variable,
          value: queryVariableValue,
        },
        newCharts,
        charts
      );
    }

    // const [c0, c1] = applyTopEffects(newCharts, featureState[country]);
    // newCharts[0].value.push(c0);
    // newCharts[1].value.push(c1);

    setChartStream((prev) => [...prev, newCharts]);
    setCharts(() => newCharts);

    for (let i = 0; i != queriesJson.length; i++) {
      if (
        newQueryIdx < queriesJson.length &&
        queriesJson[newQueryIdx].normalCause.chart ==
          queriesJson[i].normalCause.chart
      ) {
        continue;
      }

      if (checkQueryValidity(newCharts, queriesJson[i], i)) {
        newQueries.push({
          idx: i,
          status: 1,
        });

        existIdx = queries.findIndex((val) => val.idx == i);
        if (existIdx != -1) {
          newQueries[newQueries.length - 1].status =
            queries[existIdx].status + 1;
        }
      }
    }

    setQueries(() => newQueries);

    checkSimulationStatus(newQueryIdx, newQueries);
  };

  const processQuery = (data, newFeatureState) => {
    /*
    check the current query and see if it is impacted by the change
    effects will happen for all charts, exept the current query target chart
    */

    if (queryIdx >= queriesJson.length) {
      applyEffects(queryIdx, queryIndices, data, featureState);
      return;
    }

    const newVariableValue =
      variationJson[data.newVariation.key].variables[
        queriesJson[queryIdx].variable
      ];

    if (
      queriesJson[queryIdx].feature == data.feature.key &&
      !queriesJson[queryIdx].flow.required.includes(newVariableValue)
    ) {
      const newQueryIndices = [...queryIndices, queryIdx];

      let tempQueryIndices = [...newQueryIndices];

      let newQueryIdx = nextIdx(tempQueryIndices);
      let tempQueryIdx = newQueryIdx;

      if (tempQueryIdx < queriesJson.length) {
        let tempVariableValue =
          variationJson[
            newFeatureState[country][queriesJson[tempQueryIdx].feature].served
              .key
          ].variables[queriesJson[tempQueryIdx].variable];

        while (
          tempQueryIdx < queriesJson.length &&
          !queriesJson[tempQueryIdx].flow.required.includes(tempVariableValue)
        ) {
          tempQueryIndices.push(tempQueryIdx);
          tempQueryIdx = nextIdx(tempQueryIndices);

          if (tempQueryIdx >= queriesJson.length) {
            break;
          }

          tempVariableValue =
            variationJson[
              newFeatureState[country][queriesJson[tempQueryIdx].feature].served
                .key
            ].variables[queriesJson[tempQueryIdx].variable];
        }
        newQueryIdx = tempQueryIdx;
      }

      applyEffects(newQueryIdx, data, featureState);

      setQueryIdx(() => newQueryIdx);
      setQueryIndices(() => newQueryIndices);
    } else {
      applyEffects(queryIdx, data, featureState);
    }
  };

  const handleAction = async (rawData) => {
    try {
      setLoading(() => true);

      const data = {
        country: {
          key: country,
        },
        feature: {
          key: rawData.feature,
        },
        newVariation: {
          key: rawData.variation,
        },
        oldVariation: {
          key: featureState[country][rawData.feature].served.key,
        },
      };

      // change both feature state and target state and using target state change the api too;
      const newFeatureState = structuredClone(featureState);
      newFeatureState[country][data.feature.key].served.key =
        data.newVariation.key;

      const newTargetState = structuredClone(targetState);
      const idx = newTargetState[data.feature.key].findIndex((target) => {
        return (
          target.audience.filters.filters[0].values[0] == country.toUpperCase()
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

  const initDefault = async () => {
    try {
      setError(() => null);
      setInitLoading(() => true);
      const newFeatureState = structuredClone(featureState);

      const newTargetState = structuredClone(targetState);

      for (const simTarget of simulationTargets) {
        newFeatureState[country][simTarget.feature].served.key =
          simTarget.variation;

        const idx = newTargetState[simTarget.feature].findIndex((target) => {
          return (
            target.audience.filters.filters[0].values[0] ==
            country.toUpperCase()
          );
        });

        newTargetState[simTarget.feature][idx].distribution[0]._variation =
          variationIds[simTarget.variation];

        const response = await createTargetsApi(
          apiKey,
          projectKey,
          simTarget.feature,
          newTargetState[simTarget.feature]
        );

        if (response.type == 'success') {
          setFeatureState(() => newFeatureState);
          setTargetState(() => newTargetState);
        } else {
          showToast(toast, response.type);
          setError(() => response.type);
          return;
        }
      }
      setStatus(() => 'ready');
    } catch (err) {
      console.error(err);
      showToast(toast, 'unknownError');
      setError(() => 'unknownError');
    } finally {
      setInitLoading(() => false);
    }
  };

  return (
    <div>
      <div className="my-6">
        <SimulationStart />
      </div>
      <div className="w-full flex">
        {(status == 'init' || status == 'reset') && (
          <Button
            className="bg-blue-700"
            onClick={initDefault}
            disabled={initLoading}
          >
            Initialize defaults {initLoading && <LoadingSpinner />}
          </Button>
        )}
        {status == 'ready' && (
          <Button onClick={startSim} className="bg-pink-600 mx-auto">
            Start Simulation
          </Button>
        )}
        {(status == 'start' || status == 'over') && (
          <div className="ml-auto">
            <Button className="bg-red-600" onClick={resetSim}>
              Reset Simulation
            </Button>
          </div>
        )}
      </div>

      {initLoading && (
        <div className="text-blue-700 text-sm font-semibold mt-4">
          preparing features with default variations for the simulation...
        </div>
      )}

      {['start', 'over'].includes(status) && (
        <div id="main-simulation-pane">
          <div className="my-6">
            {stream.map((history, i) => {
              return (
                <div className="my-6">
                  <FeatureHistorySim history={history} key={i} />
                  <ChartHistory
                    prev={chartStream[i]}
                    curr={chartStream[i + 1]}
                  />
                </div>
              );
            })}
          </div>
          <hr className="my-4" />
          <div className="w-[90%] mx-auto">
            <div className="text-center font-semibold">Latest Insights</div>
            {queries.length && (
              <div className="text-sm text-orange-600 font-semibold text-center">
                You have {queries.length} urgent report
              </div>
            )}
            <Charts charts={charts} queries={queries} key={stream.length} />
          </div>
          <div className="flex justify-center mt-5 items-center">
            <SimState featureState={featureState} />
            <span className="ml-2">
              <Reference />
            </span>
            <span className="ml-4 text-2xl font-medium bg-gray-100 rounded-xl px-2">
              <span>{minutes}</span>:<span>{seconds}</span>
            </span>
          </div>

          <div className="mt-8 ">
            {status == 'over' && gameOver.type == 'won' && (
              <div className="bg-lime-50 text-lime-600 font-semibold text-center py-5 px-6">
                Congratulations, You have won the simulation of this live sale.
                All metrics are normal.
              </div>
            )}

            {status == 'over' && gameOver.type == 'time' && (
              <div className="bg-orange-50 text-red-600 font-semibold text-center py-5 px-6">
                Time's Up...
              </div>
            )}

            {status == 'over' && gameOver.type == 'severe' && (
              <div className="bg-orange-50 text-red-600 font-semibold text-center py-5 px-6">
                Oops! looks like one or more metric has breached the severity
                mark and impacted the sale for too long .
              </div>
            )}
          </div>
          {status == 'start' && (
            <FeatureActionSim
              handleAction={handleAction}
              featureState={featureState}
              loading={loading}
              error={error}
              key={stream.length}
            />
          )}
          {loading && (
            <div className="mt-4 text-center text-blue-700 font-semibold">
              processing...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
