import React, {useState} from "react";
import {QuestionDifficult} from "../../data/questions";
import {checkAnswer, getQuestion, TgetQuestion} from "../../components/questions/qustions"

const passQuestions: number[] = []
const firstQuestion: TgetQuestion = getQuestion(QuestionDifficult.easy,passQuestions)

const GameWindow: React.FC = () => {
  const [[questionText, questionVariants, questionId],setQuestion] = useState(firstQuestion)

  const handelClick = (index: number) => {
    const isRigth = checkAnswer(questionId, index)
    if (!isRigth) {
      console.log('Не правильно!')
      return
    }
    const difficult = passQuestions.length < 4 ? QuestionDifficult.easy : passQuestions.length < 9 ? QuestionDifficult.medium : QuestionDifficult.hard
    passQuestions.push(questionId)
    setQuestion(getQuestion(difficult, passQuestions))
  }

  return (
    <div>
      <h2>Game Window</h2>
      <div className="question__title">
        {questionText}
      </div>
      <button className="question__answer-btn" onClick={()=>handelClick(0)}>
        {questionVariants[0]}
      </button>
      <button className="question__answer-btn" onClick={()=>handelClick(1)}>
        {questionVariants[1]}
      </button>
      <button className="question__answer-btn" onClick={()=>handelClick(2)}>
        {questionVariants[2]}
      </button>
      <button className="question__answer-btn" onClick={()=>handelClick(3)}>
        {questionVariants[3]}
      </button>
    </div>
  )
}

export default GameWindow