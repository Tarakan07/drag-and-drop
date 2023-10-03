import React, { useState } from "react";
import "./index.css";
const App = () => {
	const [boxes, setBoxes] = useState([
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
	]);
	const [activeBox, setActiveBox] = useState(null);
	const onDragStart = (e, box) => {
		e.target.classList.add("active");
		setActiveBox(box);
	};

	const onDragEnd = (e) => {
		e.target.classList.remove("active");
	};
	const onDragOver = (e) => {
		e.preventDefault();
		e.target.classList.add("active_over");
	};
	const onDragLeave = (e) => {
		e.target.classList.remove("active_over");
	};
	const onDrop = (e, box) => {
		setBoxes(
			boxes.map((el) => {
				if (el.id === activeBox.id) {
					return { ...box };
				}
				if (el.id === box.id) {
					return { ...activeBox };
				}
				return el;
			})
		);

		e.target.classList.remove("active_over");
	};
	console.log(boxes);
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
