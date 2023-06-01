//Вопросы брал здесь
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
		text: 'Как называется популярный рецепт приготовления макарон с мясом?',Когда основа
		variants: [
			{
				id: 1,
				text: 'По-деревенски',
				fiftyHint: true,
			},
			{
				id: 2,
				text: 'По-флотски',
				fiftyHint: true,
			},
			{
				id: 3,
				text: 'По-братски',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'По-божески',
				fiftyHint: false,
			},
		],
		rightAnswer: 2,
	},
	{
		id: 1001,
		difficult: QuestionDifficult.easy,
		text: 'Что потерял Ослик Иа в сказке про Винни-Пуха?',
		variants: [
			{
				id: 1,
				text: 'Память',
				fiftyHint: true,
			},
			{
				id: 2,
				text: 'Совесть',
				fiftyHint: false,
			},
			{
				id: 3,
				text: 'Зубы',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Хвост',
				fiftyHint: true,
			},
		],
		rightAnswer: 4,
	},
	{
		id: 1002,
		difficult: QuestionDifficult.easy,
		text: 'Какое слово пропущено в названии пиратского флага «… Роджер»?',
		variants: [
			{
				id: 1,
				text: 'Весёлый',
				fiftyHint: true,
			},
			{
				id: 2,
				text: 'Одноногий',
				fiftyHint: true,
			},
			{
				id: 3,
				text: 'Солёный',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Непотопляемый',
				fiftyHint: false,
			},
		],
		rightAnswer: 1,
	},
	{
		id: 1003,
		difficult: QuestionDifficult.easy,
		text: 'Что является характеристикой коллекционного вина?',
		variants: [
			{
				id: 1,
				text: 'Стойкость',
				fiftyHint: true,
			},
			{
				id: 2,
				text: 'Выдержка',
				fiftyHint: true,
			},
			{
				id: 3,
				text: 'Выносливость',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Трезвость',
				fiftyHint: false,
			},
		],
		rightAnswer: 2,
	},
	{
		id: 1004,
		difficult: QuestionDifficult.easy,
		text: 'Чему равна сумма углов треугольника?',
		variants: [
			{
				id: 1,
				text: '90 градусов',
				fiftyHint: false,
			},
			{
				id: 2,
				text: '100 градусов',
				fiftyHint: false,
			},
			{
				id: 3,
				text: '180 градусов',
				fiftyHint: true,
			},
			{
				id: 4,
				text: '360 градусов',
				fiftyHint: true,
			},
		],
		rightAnswer: 3,
	},
	{
		id: 1005,
		difficult: QuestionDifficult.easy,
		text: 'Как называют микроавтобусы, совершающие поездки по определённым маршрутам?',
		variants: [
			{
				id: 1,
				text: 'Рейсовка',
				fiftyHint: true,
			},
			{
				id: 2,
				text: 'Путёвка',
				fiftyHint: false,
			},
			{
				id: 3,
				text: 'Курсовка',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Маршрутка',
				fiftyHint: true,
			},
		],
		rightAnswer: 4,
	},
	{
		id: 1006,
		difficult: QuestionDifficult.easy,
		text: 'О чём писал Грибоедов, отмечая, что он «нам сладок и приятен» ?',
		variants: [
			{
				id: 1,
				text: 'Дым отечества',
				fiftyHint: true,
			},
			{
				id: 2,
				text: 'Дух купечества',
				fiftyHint: true,
			},
			{
				id: 3,
				text: 'Дар пророчества',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Пыл девичества',
				fiftyHint: false,
			},
		],
		rightAnswer: 1,
	},
	{
		id: 1007,
		difficult: QuestionDifficult.easy,
		text: 'Какой специалист занимается изучением неопознанных летающих объектов?',
		variants: [
			{
				id: 1,
				text: 'Кинолог',
				fiftyHint: true,
			},
			{
				id: 2,
				text: 'Уфолог',
				fiftyHint: true,
			},
			{
				id: 3,
				text: 'Сексопатолог',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Психиатр',
				fiftyHint: false,
			},
		],
		rightAnswer: 2,
	},
	{
		id: 2000,
		difficult: QuestionDifficult.medium,
		text: 'Кольцо какого цвета на олимпийском флаге символизирует Европу?',
		variants: [
			{
				id: 1,
				text: 'Жёлтого',
				fiftyHint: false,
			},
			{
				id: 2,
				text: 'Голубого',
				fiftyHint: true,
			},
			{
				id: 3,
				text: 'Красного',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Зелёного',
				fiftyHint: true,
			},
		],
		rightAnswer: 2,
	},
	{
		id: 2001,
		difficult: QuestionDifficult.medium,
		text: 'Как заканчивается первая строчка считалочки: «Аты-баты…»?',
		variants: [
			{
				id: 1,
				text: 'Шли солдаты',
				fiftyHint: true,
			},
			{
				id: 2,
				text: 'Плыли моряки',
				fiftyHint: true,
			},
			{
				id: 3,
				text: 'Скакали кавалеристы',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Кричали депутаты',
				fiftyHint: false,
			},
		],
		rightAnswer: 1,
	},
	{
		id: 2002,
		difficult: QuestionDifficult.medium,
		text: 'Из меха какого животного шьют шапки королевских гвардейцев Великобритании?',
		variants: [
			{
				id: 1,
				text: 'Соболь',
				fiftyHint: true,
			},
			{
				id: 2,
				text: 'Медведь',
				fiftyHint: true,
			},
			{
				id: 3,
				text: 'Лиса',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Лама',
				fiftyHint: false,
			},
		],
		rightAnswer: 2,
	},
	{
		id: 2003,
		difficult: QuestionDifficult.medium,
		text: 'В каком виде спорта разыгрывается Кубок Стэнли?',
		variants: [
			{
				id: 1,
				text: 'Футбол',
				fiftyHint: false,
			},
			{
				id: 2,
				text: 'Теннис',
				fiftyHint: true,
			},
			{
				id: 3,
				text: 'Велоспорт',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Хоккей',
				fiftyHint: true,
			},
		],
		rightAnswer: 4,
	},
	{
		id: 2004,
		difficult: QuestionDifficult.medium,
		text: 'Какой напиток получают из сахарного тростника?',
		variants: [
			{
				id: 1,
				text: 'Джин',
				fiftyHint: false,
			},
			{
				id: 2,
				text: 'Коньяк',
				fiftyHint: false,
			},
			{
				id: 3,
				text: 'Ром',
				fiftyHint: true,
			},
			{
				id: 4,
				text: 'Кальвадос',
				fiftyHint: true,
			},
		],
		rightAnswer: 3,
	},
	{
		id: 2005,
		difficult: QuestionDifficult.medium,
		text: 'Как называется разновидность воды, в которой атом водорода замещён его изотопом дейтерием?',
		variants: [
			{
				id: 1,
				text: 'Лёгкая',
				fiftyHint: false,
			},
			{
				id: 2,
				text: 'Средняя',
				fiftyHint: false,
			},
			{
				id: 3,
				text: 'Тяжёлая',
				fiftyHint: true,
			},
			{
				id: 4,
				text: 'Невесомая',
				fiftyHint: true,
			},
		],
		rightAnswer: 3,
	},
	{
		id: 2006,
		difficult: QuestionDifficult.medium,
		text: 'Что такое десница?',
		variants: [
			{
				id: 1,
				text: 'Бровь',
				fiftyHint: false,
			},
			{
				id: 2,
				text: 'Глаз',
				fiftyHint: true,
			},
			{
				id: 3,
				text: 'Шея',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Рука',
				fiftyHint: true,
			},
		],
		rightAnswer: 4,
	},
	{
		id: 2007,
		difficult: QuestionDifficult.medium,
		text: 'В какое море впадает река Урал?',
		variants: [
			{
				id: 1,
				text: 'Каспийское',
				fiftyHint: true,
			},
			{
				id: 2,
				text: 'Чёрное',
				fiftyHint: true,
			},
			{
				id: 3,
				text: 'Азовское',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Средиземное',
				fiftyHint: false,
			},
		],
		rightAnswer: 1,
	},
	{
		id: 3000,
		difficult: QuestionDifficult.hard,
		text: 'Что не входило в рецепт салата оливье в 1894 году?',
		variants: [
			{
				id: 1,
				text: 'Картофель',
				fiftyHint: true,
			},
			{
				id: 2,
				text: 'Огурцы',
				fiftyHint: true,
			},
			{
				id: 3,
				text: 'Докторская колбаса',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Оливки',
				fiftyHint: false,
			},
		],
		rightAnswer: 2,
	},
	{
		id: 3001,
		difficult: QuestionDifficult.hard,
		text: 'В каком конструкторском бюро создали самолёт АНТ-25, на котором экипажи Чкалова и Громова достигли США?',
		variants: [
			{
				id: 1,
				text: 'Туполева',
				fiftyHint: true,
			},
			{
				id: 2,
				text: 'Антонова',
				fiftyHint: true,
			},
			{
				id: 3,
				text: 'Ильюшина',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Лавочкина',
				fiftyHint: false,
			},
		],
		rightAnswer: 1,
	},
	{
		id: 3002,
		difficult: QuestionDifficult.hard,
		text: 'Какой камень венчает Большую императорскую корону Российской империи, хранящуюся в Алмазном фонде?',
		variants: [
			{
				id: 1,
				text: 'Алмаз',
				fiftyHint: false,
			},
			{
				id: 2,
				text: 'Сапфир',
				fiftyHint: true,
			},
			{
				id: 3,
				text: 'Благородная шпинель',
				fiftyHint: true,
			},
			{
				id: 4,
				text: 'Рубин',
				fiftyHint: false,
			},
		],
		rightAnswer: 3,
	},
	{
		id: 3003,
		difficult: QuestionDifficult.hard,
		text: 'Какой была настоящая фамилия Штирлица, если верить книгам Юлиана Семёнова?',
		variants: [
			{
				id: 1,
				text: 'Исаев',
				fiftyHint: true,
			},
			{
				id: 2,
				text: 'Тихонов',
				fiftyHint: false,
			},
			{
				id: 3,
				text: 'Петров',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Владимиров',
				fiftyHint: true,
			},
		],
		rightAnswer: 4,
	},
	{
		id: 3004,
		difficult: QuestionDifficult.hard,
		text: 'С какой фигуры начинаются соревнования по городошному спорту?',
		variants: [
			{
				id: 1,
				text: 'Часовые',
				fiftyHint: true,
			},
			{
				id: 2,
				text: 'Артиллерия',
				fiftyHint: false,
			},
			{
				id: 3,
				text: 'Пулемётное гнездо',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Пушка',
				fiftyHint: true,
			},
		],
		rightAnswer: 4,
	},
	{
		id: 3005,
		difficult: QuestionDifficult.hard,
		text: 'Каким был самый разгромный счет в истории официальных футбольных матчей?',
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
		text: 'Сколько раз в сутки подзаводят куранты Спасской башни Кремля?',
		variants: [
			{
				id: 1,
				text: 'Один',
				fiftyHint: true,
			},
			{
				id: 2,
				text: 'Два',
				fiftyHint: true,
			},
			{
				id: 3,
				text: 'Три',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Четыре',
				fiftyHint: false,
			},
		],
		rightAnswer: 2,
	},
	{
		id: 3007,
		difficult: QuestionDifficult.hard,
		text: 'Как назывался каменный монолит, на котором установлен памятник Петру I в Санкт-Петербурге?',
		variants: [
			{
				id: 1,
				text: 'Гром-камень',
				fiftyHint: true,
			},
			{
				id: 2,
				text: 'Дом-камень',
				fiftyHint: true,
			},
			{
				id: 3,
				text: 'Гора-камень',
				fiftyHint: false,
			},
			{
				id: 4,
				text: 'Разрыв-камень',
				fiftyHint: false,
			},
		],
		rightAnswer: 1,
	},
];

export function getQuestions() {
	return Questions;
}
