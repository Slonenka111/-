import {
	getQuestions,
	IQuestions,
	IVariants,
	QuestionDifficult,
	TAnswerNumbers,
} from '../../data/questions';src/data/вопросы.ts
import { defaultViewerHint, TViewerHint } from '../../store/game-context';

type TgetQuestion = [questionText: string, questionVariants: IVariants[], questionId: number];

const VARIANT_ID_TO_LABEL = Object.freeze({ 1: 'A', 2: 'B', 3: 'C', 4: 'D' });

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

const getQuestion = (id: number): IQuestions | undefined => {
	return questions.find((question) => question.id === id);
};

const getQuestionById = (id: number): TgetQuestion => {
	const question = questions.filter((question) => question.id === id)[0];
	return [question.text, question.variants, question.id];
};

const getRightAnswer = (id: number): TAnswerNumbers | undefined => {
	const question = questions.find((question) => question.id === id);
	return question?.rightAnswer;
};

const getCallHint = (id: number, fiftyOption: boolean): string | undefined => {
	const question = getQuestion(id);
	if (question === undefined) {
		return undefined;
	}
	let variants: IVariants[] = question.variants;
	let countQuestion: number = 4;
	if (fiftyOption) {
		variants = variants.filter((variant: IVariants) => variant.fiftyHint);
		countQuestion = 2;
	}
	const randomAnswer = variants[getRandom(countQuestion)];
	const randomValue = getRandom(10);
	const answerNumber = randomValue < 7 ? question.rightAnswer : randomAnswer.id;

	return VARIANT_ID_TO_LABEL[answerNumber];
};

const getViewerHint = (
	id: number,
	difficult: QuestionDifficult,
	fiftyHint: boolean
): TViewerHint | undefined => {
	const question = getQuestion(id);

	if (question === undefined) {
		return undefined;
	}
	const { variants, rightAnswer } = question;

	const [defaultValue, bonusValue]: [number, number] =
		difficult === QuestionDifficult.easy
			? [30, 40]
			: difficult === QuestionDifficult.medium
			? [45, 10]
			: [50, 0];

	const result = { ...defaultViewerHint };
	const randValue1: number = getRandom(defaultValue);
	const randValue2: number = getRandom(defaultValue);
	const addValue1: number = defaultValue - randValue1;
	const addValue2: number = defaultValue - randValue2;

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

		result[Number(key) as TAnswerNumbers] = randomValuesArr.pop() as number;
	}
	return result;
};

export {
	getRandomQuestion,
	getQuestionById,
	getRightAnswer,
	getCallHint,
	getViewerHint,
	VARIANT_ID_TO_LABEL,
};
export type { TgetQuestion };
