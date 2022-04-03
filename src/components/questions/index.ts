import { getQuestions, QuestionDifficult, IVariants } from '../../data/questions';

export type TgetQuestion = [
	questionText: string,
	questionVariants: IVariants[],
	questionId: number
];

const questions = getQuestions();

const getRandom = (length: number = 1) => {
	return Math.floor(Math.random() * length);
};

export const getRandomQuestion = (
	difficult: QuestionDifficult,
	passQuestions?: number[]
): TgetQuestion => {
	const questionsCollection = questions.filter(
		(question) => question.difficult === difficult && !passQuestions?.includes(question.id)
	);

	const question = questionsCollection[getRandom(questionsCollection.length)];
	return [question.text, question.variants, question.id];
};

export const getQuestionOnId = (id: number): TgetQuestion => {
	const question = questions.filter((question) => question.id === id)[0];

	return [question.text, question.variants, question.id];
};

export const checkAnswer = (id: number, index: number): boolean => {
	const question = questions.filter((question) => question.id === id)[0];
	return index === question?.rightAnswer;
};
