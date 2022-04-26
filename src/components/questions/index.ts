import {
	getQuestions,
	IQuestions,
	IVariants,
	QuestionDifficult,
	TAnswerNumbers,
} from '../../data/questions';
import { defaultViewerHint, TViewerHint } from '../../store/game-context';

type TgetQuestion = [questionText: string, questionVariants: IVariants[], questionId: number];

const questions = getQuestions();

const getRandom = (length: number = 1) => {
	return Math.floor(Math.random() * length);
};

const getRandomQuestion = (
	difficult: QuestionDifficult,
	passQuestions?: number[]
): TgetQuestion => {
	const questionsCollection = questions.filter(
		(question) => question.difficult === difficult && !passQuestions?.includes(question.id)
	);

	const question = questionsCollection[getRandom(questionsCollection.length)];
	return [question.text, question.variants, question.id];
};

const getQuestion = (id: number): IQuestions => {
	return questions.filter((question) => question.id === id)[0];
};

const getQuestionById = (id: number): TgetQuestion => {
	const question = getQuestion(id);

	return [question.text, question.variants, question.id];
};

const getRightAnswer = (id: number): TAnswerNumbers | undefined => {
	const question = questions.find((question) => question.id === id);
	return question?.rightAnswer;
};

const getCallHint = (id: number, fiftyOption: boolean): string => {
	const question = getQuestion(id);
	let variants = question.variants,
		countQuestion = 4;
	if (fiftyOption) {
		variants = variants.filter((variant: IVariants) => variant.fiftyHint);
		countQuestion = 2;
	}
	const randomAnswer = variants[getRandom(countQuestion)],
		randomValue = getRandom(10),
		answerNumber = randomValue < 7 ? question.rightAnswer : randomAnswer.id;

	const switchAnswer = (value: number) => {
		let answer = '';
		switch (value) {
			case 1:
				answer = 'A';
				break;
			case 2:
				answer = 'B';
				break;
			case 3:
				answer = 'C';
				break;
			case 4:
				answer = 'D';
		}
		return answer;
	};
	return switchAnswer(answerNumber);
};

const getViewerHint = (
	id: number,
	difficult: QuestionDifficult,
	fiftyHint: boolean
): TViewerHint => {
	const { variants, rightAnswer } = getQuestion(id);

	const [defaultValue, bonusValue] =
		difficult === QuestionDifficult.easy
			? [30, 40]
			: difficult === QuestionDifficult.medium
			? [45, 10]
			: [50, 0];

	const result = { ...defaultViewerHint };
	const randValue1: number = getRandom(defaultValue),
		randValue2: number = getRandom(defaultValue),
		addValue1: number = defaultValue - randValue1,
		addValue2: number = defaultValue - randValue2;

	if (fiftyHint) {
		const similarAnswers = variants.filter(
			(variant: IVariants) => variant.fiftyHint && variant.id !== rightAnswer
		);
		result[rightAnswer] = Math.max(randValue1 * 2, addValue1 * 2) + bonusValue;
		result[similarAnswers[0].id] = Math.min(randValue1 * 2, addValue1 * 2);
		return result;
	}

	const randomValuesArr: number[] = [randValue1, randValue2, addValue1, addValue2];
	const maxRandomValues = Math.max(...randomValuesArr);
	result[rightAnswer] = maxRandomValues + bonusValue;

	randomValuesArr.slice(randomValuesArr.indexOf(maxRandomValues), 1);

	for (let key in result) {
		if ((Number(key) as number) === (rightAnswer as number)) continue;

		result[Number(key) as TAnswerNumbers] = <number>randomValuesArr.pop();
	}

	return result;
};

export { getRandomQuestion, getQuestionById, getRightAnswer, getCallHint, getViewerHint };
export type { TgetQuestion };
