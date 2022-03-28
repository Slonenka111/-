import React, {useState} from "react";
import {QuestionDifficult} from "../../data/questions";
import {checkAnswer, getQuestion, TgetQuestion} from "../../components/questions/qustions"
import '../../components/questions/question.css'

const passQuestions: number[] = []
const firstQuestion: TgetQuestion = getQuestion(QuestionDifficult.easy, passQuestions)

const GameWindow: React.FC = () => {
    const [[questionText, questionVariants, questionId], setQuestion] = useState(firstQuestion)

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
        <div className='question'>
            <div className="question__container--title">
                <div className='question__item--title'>
                    <h2 className='question__title'>
                        {questionText}
                    </h2>
                </div>
            </div>
            <div className='question__container'>
                <div className='question__item'>
                    <button className="question__answer-btn" onClick={() => handelClick(0)}>
                        {questionVariants[0]}
                    </button>
                </div>
                <div className='question__item'>
                    <button className="question__answer-btn" onClick={() => handelClick(1)}>
                        {questionVariants[1]}
                    </button>
                </div>
                <div className='question__item'>
                    <button className="question__answer-btn" onClick={() => handelClick(2)}>
                        {questionVariants[2]}
                    </button>
                </div>
                <div className='question__item'>
                    <button className="question__answer-btn" onClick={() => handelClick(3)}>
                        {questionVariants[3]}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GameWindow