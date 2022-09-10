/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState } from 'react';

import Box from '@mui/material/Box';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { timerDuration } from '../../utils/consts';

import './QuestionTimer.css';

const renderTime = ({ remainingTime }) => {
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender(val => val + 1);
    }, 20);
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="time-wrapper">
      <div key={remainingTime} className={`time ${isTimeUp ? 'up' : ''}`}>
        {remainingTime}
      </div>
      {prevTime.current !== null && (
        <div
          key={prevTime.current}
          className={`time ${!isTimeUp ? 'down' : ''}`}
        >
          {prevTime.current}
        </div>
      )}
    </div>
  );
};

export default function QuestionTimer({
  isPlaying,
  duration,
  initialRemainingTime,
  onComplete,
  onUpdate,
}) {
  return (
    <Box sx={{ my: 3 }}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        initialRemainingTime={initialRemainingTime}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        size={80}
        colorsTime={[
          timerDuration / 2,
          timerDuration / 4,
          timerDuration / 8,
          0,
        ]}
        onComplete={onComplete}
        onUpdate={onUpdate}
      >
        {renderTime}
      </CountdownCircleTimer>
    </Box>
  );
}
