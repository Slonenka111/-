import React from "react";
import {getQuestions} from "../../data/questions";

const GameWindow: () => JSX.Element = () => {

  const QUESTIONS = getQuestions()
  const question = QUESTIONS.easy[0].title
  const answerFirst = QUESTIONS.easy[0].answer[0]

  return (
    <div>
      <h2>Game Window</h2>
      <div className="question__title">
        {question}
      </div>
      <button className="question__answer-btn">
        {answerFirst}
      </button>
    </div>
  )
}

export default GameWindow