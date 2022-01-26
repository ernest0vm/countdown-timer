import {useState, useEffect, useCallback} from 'react';
import BackgroundTimer from 'react-native-background-timer';
import {singletonHook} from 'react-singleton-hook';

let config = {};
const initState = {
  start: () => {},
  pause: () => {},
  reset: () => {},
  stop: () => {},
  isActive: false,
  isFinished: false,
  secondsLeft: 0,
};

export const configTimer = (seconds, autostart) => {
  config = {
    seconds,
    autostart,
  };
};

const useTimerImpl = () => {
  const {seconds, autostart} = config;
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  const [timerOn, setTimerOn] = useState(false);

  /// Runs when timerOn value changes to start or stop timer
  //   useEffect(() => {
  //     if (timerOn) {
  //       initTimer();
  //     } else {
  //       BackgroundTimer.stopBackgroundTimer();
  //     }
  //     return () => {
  //       BackgroundTimer.stopBackgroundTimer();
  //     };
  //   }, [timerOn]);

  /// Checks if secondsLeft = 0 and stop timer if so
  useEffect(() => {
    if (secondsLeft === 0) {
      stop();
    }
  }, [secondsLeft, stop]);

  /// Init countdown automatically
  useEffect(() => {
    if (autostart) {
      start();
    } else {
      pause();
    }
  }, [autostart, start, pause]);

  const initTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => {
        if (secs > 0) {
          return secs - 1;
        }

        return 0;
      });
    }, 1000);
  };

  const start = useCallback(() => {
    if (!timerOn) {
      setTimerOn(true);
      initTimer();
    }
  }, [timerOn]);

  const pause = useCallback(() => {
    setTimerOn(false);
    BackgroundTimer.stopBackgroundTimer();
  }, [setTimerOn]);

  const stop = useCallback(() => {
    setSecondsLeft(0);
    setTimerOn(false);
    BackgroundTimer.stopBackgroundTimer();
  }, [setTimerOn]);

  const reset = useCallback(() => {
    setSecondsLeft(100);
  }, []);

  return {
    start,
    pause,
    reset,
    stop,
    isActive: timerOn,
    isFinished: secondsLeft === 0,
    secondsLeft,
  };
};

export const useTimer = singletonHook(initState, useTimerImpl);
