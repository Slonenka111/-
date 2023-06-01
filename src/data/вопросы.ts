//������� ���� �����
//http://gameshows.ru/wiki/%D0%9A%D1%82%D0%BE_%D1%85%D0%BE%D1%87%D0%B5%D1%82_%D1%81%D1%82%D0%B0%D1%82%D1%8C_%D0%BC%D0%B8%D0%BB%D0%BB%D0%B8%D0%BE%D0%BD%D0%B5%D1%80%D0%BE%D0%BC%3F_(%D0%9F%D0%BE%D0%B2%D1%82%D0%BE%D1%80_%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81%D0%B0)

export enum QuestionDifficult {
	easy = 'easy',
	medium = 'medium',
	hard = 'hard',
}

export type TAnswerNumbers = 1 | 2 | 3 | 4;

export interface IVariants {
	id: TAnswerNumbers;
	text: string;
	fiftyHint: boolean;
}

export interface IQuestions {
	id: number;
	difficult: QuestionDifficult;
	text: string;
	variants: IVariants[];
	rightAnswer: TAnswerNumbers;
}

const Questions: IQuestions[] = [
	{
		id: 1000,
		difficult: QuestionDifficult.easy,
		text: '��� ����'
		variants: [
			{
				id: 1,
				text: '��-����������',
				fiftyHint: true,
			},
			{
				id: 2,
				text: '��-�������',
				fiftyHint: true,
			},
			{
				id: 3,
				text: '��-�������',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '��-�������',
				fiftyHint: false,
			},
		],
		rightAnswer: 2,
	},
	{
		id: 1001,
		difficult: QuestionDifficult.easy,
		text: '���',
		variants: [
			{
				id: 1,
				text: '������',
				fiftyHint: true,
			},
			{
				id: 2,
				text: '�������',
				fiftyHint: false,
			},
			{
				id: 3,
				text: '����',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '�����',
				fiftyHint: true,
			},
		],
		rightAnswer: 4,
	},
	{
		id: 1002,
		difficult: QuestionDifficult.easy,
		text: '����� ����� ��������� � �������� ���������� ����� �� ������?',
		variants: [
			{
				id: 1,
				text: '������',
				fiftyHint: true,
			},
			{
				id: 2,
				text: '���������',
				fiftyHint: true,
			},
			{
				id: 3,
				text: '������',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '�������������',
				fiftyHint: false,
			},
		],
		rightAnswer: 1,
	},
	{
		id: 1003,
		difficult: QuestionDifficult.easy,
		text: '��� �������� ��������������� �������������� ����?',
		variants: [
			{
				id: 1,
				text: '���������',
				fiftyHint: true,
			},
			{
				id: 2,
				text: '��������',
				fiftyHint: true,
			},
			{
				id: 3,
				text: '������������',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '���������',
				fiftyHint: false,
			},
		],
		rightAnswer: 2,
	},
	{
		id: 1004,
		difficult: QuestionDifficult.easy,
		text: '���� ����� ����� ����� ������������?',
		variants: [
			{
				id: 1,
				text: '90 ��������',
				fiftyHint: false,
			},
			{
				id: 2,
				text: '100 ��������',
				fiftyHint: false,
			},
			{
				id: 3,
				text: '180 ��������',
				fiftyHint: true,
			},
			{
				id: 4,
				text: '360 ��������',
				fiftyHint: true,
			},
		],
		rightAnswer: 3,
	},
	{
		id: 1005,
		difficult: QuestionDifficult.easy,
		text: '��� �������� �������������, ����������� ������� �� ����������� ���������?',
		variants: [
			{
				id: 1,
				text: '��������',
				fiftyHint: true,
			},
			{
				id: 2,
				text: '������',
				fiftyHint: false,
			},
			{
				id: 3,
				text: '��������',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '���������',
				fiftyHint: true,
			},
		],
		rightAnswer: 4,
	},
	{
		id: 1006,
		difficult: QuestionDifficult.easy,
		text: '� ��� ����� ���������, �������, ��� �� ���� ������ � ������� ?',
		variants: [
			{
				id: 1,
				text: '��� ���������',
				fiftyHint: true,
			},
			{
				id: 2,
				text: '��� ����������',
				fiftyHint: true,
			},
			{
				id: 3,
				text: '��� �����������',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '��� ����������',
				fiftyHint: false,
			},
		],
		rightAnswer: 1,
	},
	{
		id: 1007,
		difficult: QuestionDifficult.easy,
		text: '����� ���������� ���������� ��������� ������������ �������� ��������?',
		variants: [
			{
				id: 1,
				text: '�������',
				fiftyHint: true,
			},
			{
				id: 2,
				text: '������',
				fiftyHint: true,
			},
			{
				id: 3,
				text: '������������',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '��������',
				fiftyHint: false,
			},
		],
		rightAnswer: 2,
	},
	{
		id: 2000,
		difficult: QuestionDifficult.medium,
		text: '������ ������ ����� �� ����������� ����� ������������� ������?',
		variants: [
			{
				id: 1,
				text: 'Ƹ�����',
				fiftyHint: false,
			},
			{
				id: 2,
				text: '��������',
				fiftyHint: true,
			},
			{
				id: 3,
				text: '��������',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '�������',
				fiftyHint: true,
			},
		],
		rightAnswer: 2,
	},
	{
		id: 2001,
		difficult: QuestionDifficult.medium,
		text: '��� ������������� ������ ������� ����������: ����-������?',
		variants: [
			{
				id: 1,
				text: '��� �������',
				fiftyHint: true,
			},
			{
				id: 2,
				text: '����� ������',
				fiftyHint: true,
			},
			{
				id: 3,
				text: '������� �����������',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '������� ��������',
				fiftyHint: false,
			},
		],
		rightAnswer: 1,
	},
	{
		id: 2002,
		difficult: QuestionDifficult.medium,
		text: '�� ���� ������ ��������� ���� ����� ����������� ���������� ��������������?',
		variants: [
			{
				id: 1,
				text: '������',
				fiftyHint: true,
			},
			{
				id: 2,
				text: '�������',
				fiftyHint: true,
			},
			{
				id: 3,
				text: '����',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '����',
				fiftyHint: false,
			},
		],
		rightAnswer: 2,
	},
	{
		id: 2003,
		difficult: QuestionDifficult.medium,
		text: '� ����� ���� ������ ������������� ����� ������?',
		variants: [
			{
				id: 1,
				text: '������',
				fiftyHint: false,
			},
			{
				id: 2,
				text: '������',
				fiftyHint: true,
			},
			{
				id: 3,
				text: '���������',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '������',
				fiftyHint: true,
			},
		],
		rightAnswer: 4,
	},
	{
		id: 2004,
		difficult: QuestionDifficult.medium,
		text: '����� ������� �������� �� ��������� ���������?',
		variants: [
			{
				id: 1,
				text: '����',
				fiftyHint: false,
			},
			{
				id: 2,
				text: '������',
				fiftyHint: false,
			},
			{
				id: 3,
				text: '���',
				fiftyHint: true,
			},
			{
				id: 4,
				text: '���������',
				fiftyHint: true,
			},
		],
		rightAnswer: 3,
	},
	{
		id: 2005,
		difficult: QuestionDifficult.medium,
		text: '��� ���������� ������������� ����, � ������� ���� �������� ������� ��� �������� ���������?',
		variants: [
			{
				id: 1,
				text: '˸����',
				fiftyHint: false,
			},
			{
				id: 2,
				text: '�������',
				fiftyHint: false,
			},
			{
				id: 3,
				text: '������',
				fiftyHint: true,
			},
			{
				id: 4,
				text: '���������',
				fiftyHint: true,
			},
		],
		rightAnswer: 3,
	},
	{
		id: 2006,
		difficult: QuestionDifficult.medium,
		text: '��� ����� �������?',
		variants: [
			{
				id: 1,
				text: '�����',
				fiftyHint: false,
			},
			{
				id: 2,
				text: '����',
				fiftyHint: true,
			},
			{
				id: 3,
				text: '���',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '����',
				fiftyHint: true,
			},
		],
		rightAnswer: 4,
	},
	{
		id: 2007,
		difficult: QuestionDifficult.medium,
		text: '� ����� ���� ������� ���� ����?',
		variants: [
			{
				id: 1,
				text: '����������',
				fiftyHint: true,
			},
			{
				id: 2,
				text: '׸����',
				fiftyHint: true,
			},
			{
				id: 3,
				text: '��������',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '�����������',
				fiftyHint: false,
			},
		],
		rightAnswer: 1,
	},
	{
		id: 3000,
		difficult: QuestionDifficult.hard,
		text: '��� �� ������� � ������ ������ ������ � 1894 ����?',
		variants: [
			{
				id: 1,
				text: '���������',
				fiftyHint: true,
			},
			{
				id: 2,
				text: '������',
				fiftyHint: true,
			},
			{
				id: 3,
				text: '���������� �������',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '������',
				fiftyHint: false,
			},
		],
		rightAnswer: 2,
	},
	{
		id: 3001,
		difficult: QuestionDifficult.hard,
		text: '� ����� ��������������� ���� ������� ������ ���-25, �� ������� ������� ������� � ������� �������� ���?',
		variants: [
			{
				id: 1,
				text: '��������',
				fiftyHint: true,
			},
			{
				id: 2,
				text: '��������',
				fiftyHint: true,
			},
			{
				id: 3,
				text: '��������',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '���������',
				fiftyHint: false,
			},
		],
		rightAnswer: 1,
	},
	{
		id: 3002,
		difficult: QuestionDifficult.hard,
		text: '����� ������ ������� ������� ������������� ������ ���������� �������, ���������� � �������� �����?',
		variants: [
			{
				id: 1,
				text: '�����',
				fiftyHint: false,
			},
			{
				id: 2,
				text: '������',
				fiftyHint: true,
			},
			{
				id: 3,
				text: '����������� �������',
				fiftyHint: true,
			},
			{
				id: 4,
				text: '�����',
				fiftyHint: false,
			},
		],
		rightAnswer: 3,
	},
	{
		id: 3003,
		difficult: QuestionDifficult.hard,
		text: '����� ���� ��������� ������� ��������, ���� ������ ������ ������ �������?',
		variants: [
			{
				id: 1,
				text: '�����',
				fiftyHint: true,
			},
			{
				id: 2,
				text: '�������',
				fiftyHint: false,
			},
			{
				id: 3,
				text: '������',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '����������',
				fiftyHint: true,
			},
		],
		rightAnswer: 4,
	},
	{
		id: 3004,
		difficult: QuestionDifficult.hard,
		text: '� ����� ������ ���������� ������������ �� ����������� ������?',
		variants: [
			{
				id: 1,
				text: '�������',
				fiftyHint: true,
			},
			{
				id: 2,
				text: '����������',
				fiftyHint: false,
			},
			{
				id: 3,
				text: '��������� ������',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '�����',
				fiftyHint: true,
			},
		],
		rightAnswer: 4,
	},
	{
		id: 3005,
		difficult: QuestionDifficult.hard,
		text: '����� ��� ����� ���������� ���� � ������� ����������� ���������� ������?',
		variants: [
			{
				id: 1,
				text: '23:4',
				fiftyHint: false,
			},
			{
				id: 2,
				text: '46:2',
				fiftyHint: true,
			},
			{
				id: 3,
				text: '100:1',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '149:0',
				fiftyHint: true,
			},
		],
		rightAnswer: 4,
	},
	{
		id: 3006,
		difficult: QuestionDifficult.hard,
		text: '������� ��� � ����� ���������� ������� �������� ����� ������?',
		variants: [
			{
				id: 1,
				text: '����',
				fiftyHint: true,
			},
			{
				id: 2,
				text: '���',
				fiftyHint: true,
			},
			{
				id: 3,
				text: '���',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '������',
				fiftyHint: false,
			},
		],
		rightAnswer: 2,
	},
	{
		id: 3007,
		difficult: QuestionDifficult.hard,
		text: '��� ��������� �������� �������, �� ������� ���������� �������� ����� I � �����-����������?',
		variants: [
			{
				id: 1,
				text: '����-������',
				fiftyHint: true,
			},
			{
				id: 2,
				text: '���-������',
				fiftyHint: true,
			},
			{
				id: 3,
				text: '����-������',
				fiftyHint: false,
			},
			{
				id: 4,
				text: '������-������',
				fiftyHint: false,
			},
		],
		rightAnswer: 1,
	},
];

export function getQuestions() {
	return Questions;
}