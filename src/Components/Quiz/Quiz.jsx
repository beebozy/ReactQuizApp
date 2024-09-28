import React, { useState } from 'react';
import './Quiz.css';
import quizData from './Quiz.js';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0); // Track current question index
  const [usersAnswer, setUsersAnswer] = useState([]); // Store user's answers
  const [showResult, setShowResult] = useState(false); // State to show result

  // Function to handle when an answer is selected
  const handleAnswerSelect = (option) => {
    const updatedAnswers = [...usersAnswer];
    updatedAnswers[currentQuestion] = option; // Store answer for the current question
    setUsersAnswer(updatedAnswers);
  };

  // Function to handle Next button
  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true); // Show result when the quiz is completed
    }
  };

  // Function to handle Previous button
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Calculate Score
  const calculateScore = () => {
    let score = 0;
    quizData.forEach((question, index) => {
      if (question.answer === usersAnswer[index]) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <>
      <div className='container'>
        <h1>Quiz App</h1>
        <hr />

        {/* Render the quiz questions or result */}
        {!showResult ? (
          <>
            {/* Display the current question */}
            <h2>{quizData[currentQuestion].question}</h2>
            <ul>
              {/* Map over the options array */}
              {quizData[currentQuestion].options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={usersAnswer[currentQuestion] === option ? 'selected' : ''}
                >
                  {option}
                </li>
              ))}
            </ul>

            {/* Navigation buttons */}
            <div className='navigation'>
              <button onClick={handlePrev} disabled={currentQuestion === 0}>
                Previous
              </button>
              <button onClick={handleNext}>
                {currentQuestion === quizData.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>

            {/* Display current question number */}
            <div className='index'>
              Question {currentQuestion + 1} of {quizData.length}
            </div>
          </>
        ) : (
          // Show Result Section
          <div className='result'>
            <h2>Quiz Completed!</h2>
            <p>
              You scored {calculateScore()} out of {quizData.length}.
            </p>
            <ul>
              {quizData.map((question, index) => (
                <li key={index}>
                  <strong>{question.question}</strong>
                  <br />
                  Correct Answer: {question.answer}
                  <br />
                  Your Answer: {usersAnswer[index] || 'Not Answered'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
