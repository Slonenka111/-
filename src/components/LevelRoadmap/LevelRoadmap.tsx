import React, {useMemo} from "react";
import "./LevelRoadmap.css"

type Level = {
	id: number,
	cost: number,
}

const levels: Level[] = [
	{id: 1, cost: 100},
	{id: 2, cost: 200},
	{id: 3, cost: 300},
	{id: 4, cost: 500},
	{id: 5, cost: 1000},
	{id: 6, cost: 2000},
	{id: 7, cost: 4000},
	{id: 8, cost: 8000},
	{id: 9, cost: 16000},
	{id: 10, cost: 32000},
	{id: 11, cost: 64000},
	{id: 12, cost: 125000},
	{id: 13, cost: 250000},
	{id: 14, cost: 500000},
	{id: 15, cost: 1000000}
]

interface LevelRoadmapProps {
	currentLevel: number;
	safetyLevels: number[];
}

const LevelRoadmap: React.FC<LevelRoadmapProps> = props => {
	const {currentLevel, safetyLevels} = props;
	const reversedList = useMemo(() => levels.slice(0).reverse(), levels);

	return <ul className="level-list">
		{reversedList.map(level => (
			<li className={"level-item " + (currentLevel === level.id ? "current" : safetyLevels.includes(level.id) ? "safety" : "basic")}
				key={level.id}>
				<div className="level-number">{level.id}</div>
				<div className="level-cost">{(level.cost).toLocaleString('en-US', {
					style: "currency",
					currency: "USD",
					minimumFractionDigits: 0
				})}</div>
			</li>
		))}
	</ul>
}

export default LevelRoadmap;
