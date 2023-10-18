import * as React from "react";
import { useState } from "react";
import "./index.css";



const initialState=[
	{
		id: 1,
		title: "Карточка 1",
	},
	{
		id: 2,
		title: "Карточка 2",
	},
	{
		id: 3,
		title: "Карточка 3",
	},
	{
		id: 4,
		title: "Карточка 4",
	},
	{
		id: 5,
		title: "Карточка 5",
	},
];
interface  Card{
	id:number,
	title:string,
}


const App = () => {
	const [boxes, setBoxes] = useState<Card[]>(initialState);
	const [activeBox, setActiveBox] = useState<Card|null>(null);

	const onDragStart = (e:React.DragEvent<HTMLDivElement>, box:Card):void => {
		(e.target as HTMLDivElement).classList.add("active");
		setActiveBox(box);
	};

	const onDragEnd = (e:React.DragEvent<HTMLDivElement>):void => {
		(e.target as HTMLDivElement).classList.remove("active");
	};
	const onDragOver = (e:React.DragEvent<HTMLDivElement>):void => {
		e.preventDefault();
		(e.target as HTMLDivElement).classList.add("active_over");
	};
	const onDragLeave = (e:React.DragEvent<HTMLDivElement>):void => {
		(e.target as HTMLDivElement).classList.remove("active_over");
	};
	const onDrop = (e:React.DragEvent<HTMLDivElement>, box:Card):void => {
	const newBoxes=boxes.map((el) => {
		if(activeBox!==null){
			if (el.id === activeBox.id) {
				return { ...box };
			}
			if (el.id === box.id) {
				return { ...activeBox };
			}
			
		}
		return el;
		})
		setBoxes(newBoxes);

		(e.target as HTMLDivElement).classList.remove("active_over");
	};

	return (
		<div className="wrap">
			<div className="block">
				{boxes.map((box) => {
					return (
						<div
							onDragStart={(e) => onDragStart(e, box)}
							onDragEnd={(e) => onDragEnd(e)}
							onDragOver={(e) => onDragOver(e)}
							onDragLeave={(e) => onDragLeave(e)}
							onDrop={(e) => onDrop(e, box)}
							draggable={true}
							key={box.id}
							className="box"
						>
							<p>{box.title}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default App;
