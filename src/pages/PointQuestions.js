import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';

import { useUIContext } from '../context/UIContext';

import { request } from '../utils/functions';
import { timerDuration as importedTimerDuration } from '../utils/consts';

import QuestionOverlay from '../components/questions/QuestionOverlay';

import QuestionCard from '../components/questions/QuestionCard';

const PointQuestions = () => {
  const { setShowLoadingSpinner, setNotification, setDialog } = useUIContext();

  const { hash } = useParams();
  const navigate = useNavigate();

  // Is answering
  const [isAnswering, setIsAnswering] = useState(false);

  // Overlay
  const [overlayTitle, setOverlayTitle] = useState(
    'Prišli ste na stran za odgovarjanje na vprašanja posamezne točke. Ko boste pripravljeni odgovarjati, pritisnite spodnji gumb.'
  );
  const [overlayText, setOverlayText] = useState('Prični odgovarjati');

  // Question
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [question, setQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(null);
  const [answerId, setAnswerId] = useState(null);

  // Timer
  const [timerDuration, setTimerDuration] = useState(importedTimerDuration);
  const [remainingTime, setRemainingTime] = useState(null);

  // Update local storage timer
  const onUpdateTimer = newRemainingTime => {
    localStorage.setItem('point', `${hash}`);
    localStorage.setItem(
      `remainingTime-${hash}-${questionIndex}`,
      newRemainingTime
    );
  };

  // Get Question
  const getQuestion = useCallback(() => {
    setShowLoadingSpinner(true);

    // Get number of questions
    request(`/point_questions/${hash}`)
      .then(data => {
        setNumberOfQuestions(data);

        // Get a random question
        return request(`/questions/${hash}`);
      })
      .then(data => {
        setShowLoadingSpinner(false);

        // Reset timer
        setTimerDuration(importedTimerDuration);

        // Set correct answer
        setAnswerId(data.question.answers[0]?.answer_id);
        // Set question number
        setQuestionIndex(data.index);
        // Set question
        setQuestion(data.question);
      })
      .catch(err => {
        setShowLoadingSpinner(false);

        localStorage.removeItem('point');

        navigate('/leaderboard');

        if (err === 'GROUP_UNABLE_TO_START') {
          setDialog({
            title: 'Skupina ni pripravljena',
            text: 'Za odgovarjanje je zahtevano minimalno število članov.',
          });
        }
      });
  }, [hash, setShowLoadingSpinner, navigate, setDialog]);

  // Submit Question
  const submitQuestion = useCallback(() => {
    // Prevent answering
    setIsAnswering(false);

    // Display overlay for next question
    setOverlayTitle('Vaš odgovor je bil uspešno poslan.');
    setOverlayText('Nadaljuj');

    setShowLoadingSpinner(true);

    // Remove local storage timer
    localStorage.removeItem(`remainingTime-${hash}-${questionIndex}`);

    // Submit answer
    request(`/questions/answer`, 'POST', {
      answer_id: answerId,
      point_hash: hash,
    })
      .then(data => {
        setShowLoadingSpinner(false);

        // Display notification
        setNotification({
          title: `Vaš odgovor je bil ${
            data === 'CORRECT' ? 'pravilen' : 'nepravilen'
          }!`,
          type: data === 'CORRECT' ? 'success' : 'error',
        });

        // Get next question
        getQuestion();
      })
      .catch(err => {
        setShowLoadingSpinner(false);
      });
  }, [
    hash,
    answerId,
    setShowLoadingSpinner,
    setNotification,
    getQuestion,
    questionIndex,
  ]);

  useEffect(() => {
    // Get question
    getQuestion();

    // Get remaining time from local storage
    const remainingTimeStored = +localStorage.getItem(
      `remainingTime-${hash}-${questionIndex}`
    );

    // If there is a remaining time stored, set it
    if (remainingTimeStored) {
      setRemainingTime(remainingTimeStored);
    } else {
      setRemainingTime(timerDuration);
    }
  }, [getQuestion, hash, timerDuration, questionIndex]);

  return (
    <Container maxWidth="sm">
      {question && (
        <Card>
          <CardContent>
            {!isAnswering && (
              <QuestionOverlay
                setIsAnswering={setIsAnswering}
                title={overlayTitle}
                text={overlayText}
              />
            )}

            {isAnswering && remainingTime && (
              <QuestionCard
                numberOfQuestions={numberOfQuestions}
                question={question}
                questionIndex={questionIndex}
                answerId={answerId}
                setAnswerId={setAnswerId}
                timerDuration={timerDuration}
                remainingTime={remainingTime}
                isAnswering
                submitQuestion={submitQuestion}
                onComplete={submitQuestion}
                onUpdate={onUpdateTimer}
              />
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default PointQuestions;
