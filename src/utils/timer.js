import {useState, useEffect} from 'react';
import BackgroundTimer from 'react-native-background-timer';
import {singletonHook} from 'react-singleton-hook';

const useTimerImpl = () => {
  const [secondsLeft, setSecondsLeft] = useState(3601);
  const [timerOn, setTimerOn] = useState(false);

  /// Runs when timerOn value changes to start or stop timer
  //   useEffect(() => {
  //     if (timerOn) {
  //       startTimer();
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
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [secondsLeft]);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => {
        console.log(secs);
        if (secs > 0) {
          return secs - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
  };

  function start() {
    if (!timerOn) {
      setTimerOn(true);
      startTimer();
    }
  }

  function pause() {
    setTimerOn(false);
    BackgroundTimer.stopBackgroundTimer();
  }

  function stop() {
    setSecondsLeft(0);
    setTimerOn(false);
    BackgroundTimer.stopBackgroundTimer();
  }

  function reset() {
    setSecondsLeft(3601);
  }

  function timerIsActive() {
    return timerOn;
  }

  return {start, pause, reset, stop, timerIsActive, secondsLeft};
};

export const useTimer = singletonHook({loading: true}, useTimerImpl);
