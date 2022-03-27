import React from "react";
import {getQuestions, QuestionDifficult} from "../../data/questions";

const passQuestions: number[] = []


type TgetQuestion = [questionText: string, questionVariants: [string, string, string, string], questionId: number]

const questions = getQuestions()
const getRandom = (length: number = 1) => {
  return Math.floor(Math.random() * length)
}

const getQuestion = (difficult: QuestionDifficult, passQuestions?: number[]): TgetQuestion => {
  const questionsCollection = questions
    .filter(question => question.difficult === difficult)
    .filter(question => !passQuestions?.includes(question.id))

  const question = questionsCollection[getRandom(questionsCollection.length)]

  return [question.text, question.variants, question.id]
}

const checkAnswer = (id: number, index: number): boolean =>  {
  const question = questions.filter(question => question.id === id)[0]
  console.log(index === question?.rightAnswer)
  return index === question?.rightAnswer
}

const [questionText, questionVariants, questionId]: TgetQuestion = getQuestion(QuestionDifficult.easy, passQuestions)
passQuestions.push(questionId)

const GameWindow: () => JSX.Element = () => {
  return (
    <div>
      <h2>Game Window</h2>
      <div className="question__title">
        {questionText}
      </div>
      <button className="question__answer-btn" onClick={()=>checkAnswer(questionId,0)}>
        {questionVariants[0]}
      </button>
      <button className="question__answer-btn" onClick={()=>checkAnswer(questionId,1)}>
        {questionVariants[1]}
      </button>
      <button className="question__answer-btn" onClick={()=>checkAnswer(questionId,2)}>
        {questionVariants[2]}
      </button>
      <button className="question__answer-btn" onClick={()=>checkAnswer(questionId,3)}>
        {questionVariants[3]}
      </button>
    </div>
  )
}

export default GameWindow